import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayloadDto } from '../dto/auth.dto';

export const authMiddleware = (roles?: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header('Authorization')?.split(' ')[1];
            if (!token)
                return res.status(401).send({ message: 'No token provided' });

            const decoded = jwt.verify(token, process.env.JWT_SECRET || '01010101') as TokenPayloadDto;
            req.user = decoded;

            if (roles && !roles.includes(decoded.role)) {
                return res.status(403).send({ message: 'Access denied' });
            }

            next();
        } catch (error) {
            return res.status(401).send({ message: 'Invalid or expired token' });
        }
    };
};