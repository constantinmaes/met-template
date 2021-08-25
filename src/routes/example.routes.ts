import { Service } from 'typedi';
import express, { Router } from 'express';
import { ExampleController } from '../controllers';
import { AuthenticationMiddleware, AuthorizationMiddleware } from '../middlewares';

@Service()
export class ExampleRoutes {
    public router: Router;

    constructor(
        private authenticationMidleware: AuthenticationMiddleware,
        private authorizationMiddleware: AuthorizationMiddleware,
        private controller: ExampleController,
    ) {
        this.router = express.Router();
        this.start();
    }

    private start() {
        this.router.delete('/:id', this.controller.delete);
        this.router.get('/', this.controller.list);
        this.router.get('/:id', this.controller.find);
        this.router.patch('/:id', this.controller.update);
        this.router.post('/', this.controller.store);

        /**
         * Example protected and authorized route
         */
        this.router.get(
            '/example',
            this.authenticationMidleware.authenticate,
            this.authorizationMiddleware.permit('example:readAll'),
            this.controller.list
        );
    }
}
