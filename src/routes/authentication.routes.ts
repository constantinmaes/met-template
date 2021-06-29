import { Service } from 'typedi';
import express, { Router } from 'express';
import { AuthenticationController } from '../controllers';
import { AuthenticationMiddleware } from '../middlewares';

@Service()
export class AuthenticationRoutes {
    public router: Router;

    constructor(
        private authMiddleware: AuthenticationMiddleware,
        private controller: AuthenticationController
    ) {
        this.router = express.Router();
        this.start();
    }

    private start() {
        this.router.get(
            '/me',
            this.authMiddleware.authenticate,
            this.controller.me
        );
        this.router.post('/login', this.controller.login);
    }
}
