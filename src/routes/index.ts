import express, { Application } from 'express';
import { Service } from 'typedi';
import { ExampleRoutes } from './example.routes';
import { AuthenticationRoutes } from './authentication.routes';

@Service()
export class Routes {
    readonly #router: express.Router;

    constructor(
        private authenticationRoutes: AuthenticationRoutes,
        private exampleRoutes: ExampleRoutes
    ) {
        this.#router = express.Router();
    }
    public start(app: Application) {
        this.#router.get('/', () => console.log('base api route'));
        this.#router.use('/auth', this.authenticationRoutes.router);
        this.#router.use('/example', this.exampleRoutes.router);
        app.use('/api', this.#router);
    }
}
