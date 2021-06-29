import { Service } from 'typedi';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';
import { UserDoc, UserModel } from '../models';
import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET } from '../utils/jwt-secrets';

passport.use(
    'jwt',
    new passportJwt.Strategy(
        {
            jwtFromRequest:
                passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        (payload, done) => {
            UserModel.findOne(
                { _id: payload.sub },
                { email: 1, _id: 1 },
                null,
                (err: any, user: any) => {
                    if (err) return done(err, false);
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }
            );
        }
    )
);

passport.use(
    'login',
    new passportLocal.Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (email, password, done) => {
            UserModel.findOne(
                { email },
                { email: 1, password: 1, _id: 1 },
                null,
                async (err, user: UserDoc) => {
                    if (err) return done(err);
                    if (!user)
                        return done(undefined, false, {
                            message: `Invalid email / password`,
                        });
                    const isPasswordValid = await user.validatePassword(
                        password
                    );
                    if (!isPasswordValid) {
                        return done(undefined, false, {
                            message: `Invalid email / password`,
                        });
                    } else {
                        return done(undefined, user);
                    }
                }
            );
        }
    )
);

@Service()
export class AuthenticationMiddleware {
    readonly #jwtSecret;

    constructor() {
        this.#jwtSecret = process.env.JWT_SECRET;
        if (!this.#jwtSecret) {
            console.error(
                'Authentication Middleware error: no JWT_SECRET defined'
            );
        }
    }

    authenticate(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate('jwt', (err, user) => {
            if (err || !user) {
                return res
                    .status(401)
                    .json({ status: 'error', code: 'unauthorized' });
            } else {
                return next();
            }
        })(req, res, next);
    }
}
