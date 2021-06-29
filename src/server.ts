import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { Container } from 'typedi';
import { App } from './app';

dotenv.config();

const app = Container.get(App);

app.start();
