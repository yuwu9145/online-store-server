'use strict';

import mongoose = require('mongoose');

import * as Promise from 'bluebird';
import * as express from 'express';
import * as indexRoute from './routes/index';
import * as productRoute from './routes/product';
import * as bodyParser from 'body-parser';

class App {

    // ref to Express instance
    public express: express.Application;

    // run configration methods on the Express intance
    constructor() {
        this.express = express();
        this.middleware();
        this.config();
        this.routes();
    }
    // config Express middleware
    private middleware(): void {}

    // Configure API endpoints.
    private routes(): void {

        // use body parser so we can get info from POST and/or URL parameters
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());

        const router = express.Router();

        // create routes
        const index: indexRoute.Index = new indexRoute.Index();
        const product: productRoute.Index = new productRoute.Index();

        // index
        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => index.index(req, res, next));

        // setup
        router.get('/setup', (req: express.Request, res: express.Response, next: express.NextFunction) => index.setup(req, res, next));

        // route to authenticate a user
        router.post('/authenticate', (req: express.Request, res: express.Response, next: express.NextFunction) => index.authenticate(req, res, next, this.express));

        /* GET request for getting all Product. */
        router.get('/product/all', (req: express.Request, res: express.Response, next: express.NextFunction) => product.getAllProducts(req, res, next));

        this.express.use('/api', router);
    }

    public config() {

        const MONGODB_CONNECTION: string = process.env.MONGODB_CONNECTION;
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