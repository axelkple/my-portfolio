const express = require('express');
const router = express.Router();
const controller = require('../controllers/education');

router.route('/')
  .get(controller.getAll)     // GET    /api/educations
  .post(controller.create);   // POST   /api/educations

router.route('/:id')
  .get(controller.getById)    // GET    /api/educations/:id
  .put(controller.update)     // PUT    /api/educations/:id
  .delete(controller.remove); // DELETE /api/educations/:id

module.exports = router;
