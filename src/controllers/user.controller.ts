import { Router, Response, Request } from 'express'
import UserService from '../services/user.service';
import { authMiddleware } from '../middlewares/auth.middleware';
import { UserRole } from '../types/user.types';
import { handleResponse } from '../utils/response.utils';


const router = Router();
const userService = new UserService();

router.get("/", authMiddleware([UserRole.ADMIN]), (req: Request, res: Response) => {
    handleResponse(res, userService.findAll());
})

router.get("/:id", authMiddleware(), (req: Request, res: Response) => {
    handleResponse(res, userService.findById(
        Number(req.params.id),
        req.user?.id,
        req.user?.role
    ));
})

router.post("/:id", authMiddleware(), (req: Request, res: Response) => {
    handleResponse(res, userService.updateStatus(
        Number(req.params.id),
        req.body,
        req.user?.id,
        req.user?.role
    ));
})

export const userRouter = router;