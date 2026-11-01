const express = require('express');
const router = express.Router();
const controller = require('../controllers/project');

router.route('/')
  .get(controller.getAll)     // GET    /api/projects
  .post(controller.create);   // POST   /api/projects

router.route('/:id')
  .get(controller.getById)    // GET    /api/projects/:id
  .put(controller.update)     // PUT    /api/projects/:id
  .delete(controller.remove); // DELETE /api/projects/:id

module.exports = router;
