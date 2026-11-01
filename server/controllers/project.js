import Project from '../models/Project.js';

// GET /api/projects - list all
export const getAll = async (req, res) => {
  try {
    const items = await Project.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/projects/:id - get one
export const getById = async (req, res) => {
  try {
    const item = await Project.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Project not found' });
    res.json(item);
  } catch (err) {
    const status = err.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

// POST /api/projects - create
export const create = async (req, res) => {
  try {
    const item = await Project.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    const status = err.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

// PUT /api/projects/:id - update
export const update = async (req, res) => {
  try {
    const item = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Project not found' });
    res.json(item);
  } catch (err) {
    const status = ['CastError', 'ValidationError'].includes(err.name) ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

// DELETE /api/projects/:id - remove
export const remove = async (req, res) => {
  try {
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    const status = err.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    res.json({ message: 'All projects deleted', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};