import Education from '../models/education.js';

// GET /api/educations - list all
export const getAll = async (req, res) => {
  try {
    const items = await Education.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/educations/:id - get one
export const getById = async (req, res) => {
  try {
    const item = await Education.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Education not found' });
    res.json(item);
  } catch (err) {
    const status = err.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

// POST /api/educations - create
export const create = async (req, res) => {
  try {
    const item = await Education.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    const status = err.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

// PUT /api/educations/:id - update
export const update = async (req, res) => {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Education not found' });
    res.json(item);
  } catch (err) {
    const status = ['CastError', 'ValidationError'].includes(err.name) ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

// DELETE /api/educations/:id - remove
export const remove = async (req, res) => {
  try {
    const item = await Education.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Education not found' });
    res.json({ message: 'Education deleted' });
  } catch (err) {
    const status = err.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
};

export const removeAll = async (req, res) => {
  try {
    const result = await Education.deleteMany({});
    res.json({ message: 'All educations deleted', deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};