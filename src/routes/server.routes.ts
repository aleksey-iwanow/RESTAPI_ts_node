import {Router} from 'express';
import { userRouter } from '../controllers/user.controller';
import { authRouter } from '../controllers/auth.controller';

const router = Router();

router.use('/api/users', userRouter);
router.use('/api/auth', authRouter)

export const serverRouter = router;