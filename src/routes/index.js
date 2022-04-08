import { Router } from 'express';
import auth from './auth';

const router = new Router();

router.get('/', (_req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to Jenga Project' });
});

router.use('/auth', auth);

export default router;
