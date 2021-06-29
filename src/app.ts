import { Service } from 'typedi';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { Routes } from './routes';

@Service()
export class App {
    public app: express.Application;

    constructor(private $routes: Routes) {
        this.app = express();
        this.init();
        this.$routes.start();
    }

    public start() {
        const port = process.env.APP_PORT || 3000;
        this.app.listen(port, () => console.log(`Listening on port ${port}`));
    }

    private init() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
