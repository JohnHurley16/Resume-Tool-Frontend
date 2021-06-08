import { Router } from 'express';
const user = require('../controllers/user.controller')
const router = Router();

// Routes go here
router.post('/create', user.createUser);
router.get('/:id', user.getUser);
router.post('/update/:id', user.updateUser);
router.post('/delete', user.deleteUser);

export default router;