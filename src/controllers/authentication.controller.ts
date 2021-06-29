import { Service } from 'typedi';
import { CacheService, ExampleService } from '../services';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { JWT_SECRET } from '../utils/jwt-secrets';

@Service()
export class AuthenticationController {
    constructor(private cache: CacheService, private service: ExampleService) {
        this.login = this.login.bind(this);
        this.me = this.me.bind(this);
    }

    login(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('login', (err, user) => {
            req.login(user, { session: false }, async (error) => {
                if (error) {
                    console.error(error);
                    return next(error);
                }
                const access_token = jwt.sign(user, JWT_SECRET, {
                    expiresIn: process.env.JWT_TTL || 3600,
                });
                return res.status(200).json({ access_token });
            });
        })(req, res, next);
    }

    me(req: Request, res: Response) {
        return res.json({ ...req.user });
    }
}
