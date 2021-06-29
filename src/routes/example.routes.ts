import { Service } from 'typedi';
import express, { Router } from 'express';
import { ExampleController } from '../controllers';

@Service()
export class ExampleRoutes {
    public router: Router;

    constructor(private controller: ExampleController) {
        this.router = express.Router();
        this.start();
    }

    private start() {
        this.router.delete('/:id', this.controller.delete);
        this.router.get('/', this.controller.list);
        this.router.get('/:id', this.controller.find);
        this.router.patch('/:id', this.controller.update);
        this.router.post('/', this.controller.store);
    }
}
