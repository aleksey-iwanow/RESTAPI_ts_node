import { Router, Response, Request } from 'express'
import AuthService from '../services/auth.service';

const router = Router();
const authService = new AuthService();

router.post("/login", (req: Request, res: Response) => {
    authService.login(req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(`${err.message}`);
        });
})

router.post("/register", (req: Request, res: Response) => {
    authService.register(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json(`${err.message}`);
        });
})

export const authRouter = router;