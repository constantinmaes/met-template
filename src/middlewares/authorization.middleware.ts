import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { User } from '../interfaces';

@Service()
export class AuthorizationMiddleware {
    permit(...permitted: string[]): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.user as User;
            if (user && permitted.every(v => user.permissions.includes(v))) {
                next(); // permissions are allowed, so continue on the next middleware
            } else {
                res.status(403).json({ message: 'Forbidden' }); // user is forbidden
            }
        };
    }
}
