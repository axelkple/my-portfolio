import mongoose from 'mongoose';
import User from '../models/user.js';

import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { revokeToken } from '../utils/tokenBlacklist.js';

const toPublic = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

const signToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    jwtid: randomUUID(), // unique id so this one token can be revoked
  });

const cookieOptions = {
  httpOnly: true,                                   // JavaScript on the page can't read it
  secure: process.env.NODE_ENV === 'production',    // HTTPS only in production
  sameSite: 'lax',
};

const sendToken = (res, user, status = 200) => {
  const token = signToken(user);
  const { exp } = jwt.decode(token);
  res
    .status(status)
    .cookie('token', token, { ...cookieOptions, maxAge: exp * 1000 - Date.now() })
    .json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
};

const validId = (id) => mongoose.isValidObjectId(id);

// GET /api/users
export const getAll = async (req, res) => {
  try {
    res.json(await User.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/users/:id
export const getById = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid id' });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/users
export const create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(toPublic(user));
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Email already in use' });
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/users/:id
export const update = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid id' });

    const user = await User.findById(req.params.id).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, password } = req.body;
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (password !== undefined) user.password = password; // re-hashed by the pre-save hook

    await user.save();
    res.json(toPublic(user));
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Email already in use' });
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/users/:id


export const remove = async (req, res) => {
  try {
    const item = await User.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    const status = err.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};


// POST /api/users/signin
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    sendToken(res, user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/users/signout  (requires a valid token)
export const signout = (req, res) => {
  revokeToken(req.auth.jti, req.auth.exp);
  res.clearCookie('token', cookieOptions);
  res.json({ message: 'Signed out successfully' });
};

// GET /api/users/me  (protected)
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.auth.id);
    if (!user) return res.status(401).json({ message: 'User no longer exists' });
    res.json({ _id: user._id, name: user.name, email: user.email });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.json({ message: 'All users deleted', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};