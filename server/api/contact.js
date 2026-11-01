const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact');

router.route('/')
  .get(controller.getAll)     // GET    /api/contacts
  .post(controller.create);   // POST   /api/contacts

router.route('/:id')
  .get(controller.getById)    // GET    /api/contacts/:id
  .put(controller.update)     // PUT    /api/contacts/:id
  .delete(controller.remove); // DELETE /api/contacts/:id

module.exports = router;
