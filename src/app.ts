import { Service } from 'typedi';
import express from 'express';
import { Routes } from './routes';

@Service()
export class App {
    public app: express.Application;

    constructor(private $routes: Routes) {
        this.app = express();
        this.$routes.start();
    }

    public start() {
        const port = process.env.APP_PORT || 3000;
        this.app.listen(port, () => console.log(`Listening on port ${port}`));
    }

    private init() {}
}
