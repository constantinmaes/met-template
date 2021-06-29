import { Service } from 'typedi';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { Routes } from './routes';

@Service()
export class App {
    public app: express.Application;

    constructor(private $routes: Routes) {
        this.app = express();
        this.init();
        this.initDb();
        this.initRoutes();
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

    private initDb() {
        const db = process.env.MONGO_DATABASE || 'default';
        const host = process.env.MONGO_HOST || '127.0.0.1';
        const port = process.env.MONGO_PORT || 27017;
        const connectionString = `mongodb://${host}:${port}/${db}`;

        mongoose
            .connect(connectionString, {
                useCreateIndex: true,
                useFindAndModify: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => console.log(`Connected to MongoDB`))
            .catch((e) => console.error('Problem connecting to MongoDB', e));
    }

    private initRoutes() {
        this.$routes.start(this.app);
    }
}
