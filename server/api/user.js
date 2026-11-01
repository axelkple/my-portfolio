const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.route('/')
  .get(controller.getAll)     // GET    /api/users
  .post(controller.create);   // POST   /api/users

router.route('/:id')
  .get(controller.getById)    // GET    /api/users/:id
  .put(controller.update)     // PUT    /api/users/:id
  .delete(controller.remove); // DELETE /api/users/:id

module.exports = router;
