import express from 'express';
import * as controller from '../controllers/user.js';
import { requireAuth, requireSelf } from '../middleware/auth.js';

const router = express.Router();

router.post('/', controller.create); // POST   /api/users
router.post('/signin', controller.signin);
router.post('/signout', requireAuth, controller.signout);
router.get('/me', requireAuth, controller.me);
router.delete('/',  controller.removeAll);
router.get('/', controller.getAll)      // GET    /api/users

 
router.get('/:id', controller.getById)     // GET    /api/users/:id
router.put('/:id',  controller.update)      // PUT    /api/users/:id
router.delete('/:id',  controller.remove);  // DELETE /api/users/:id

export default router;