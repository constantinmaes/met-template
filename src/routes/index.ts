import express from 'express';
import { Service } from 'typedi';

@Service()
export class Routes {
    #router: express.Router;

    constructor() {
        this.#router = express.Router();
    }
    public start() {
        this.#router.get('/', () => console.log('base route'));
    }
}
