'use strict';

import mongoose = require('mongoose');

import * as Promise from 'bluebird';
import * as express from 'express';
import * as indexRoute from './routes/index';

class App {

    // ref to Express instance
    public express: express.Application;

    // run configration methods on the Express intance
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.config();
    }
    // config Express middleware
    private middleware(): void {}

    // Configure API endpoints.
    private routes(): void {
        const router = express.Router();

        // create routes
        const index: indexRoute.Index = new indexRoute.Index();

        // index
        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => index.index(req, res, next));

        // setup
        router.get('/setup', (req: express.Request, res: express.Response, next: express.NextFunction) => index.setup(req, res, next));

        this.express.use('/api', router);
    }

    public config() {
        const MONGODB_CONNECTION: string = 'mongodb://localhost/phonecasestore';
        mongoose.Promise = Promise;

        // Get the default connection
        mongoose.connect(MONGODB_CONNECTION, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
            else {
                console.log('Connected to MongoDb');
            }
        });
    }
}
export default new App().express;