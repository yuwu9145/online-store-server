'use strict';

import mongoose = require('mongoose');

import * as Promise from 'bluebird';
import * as express from 'express';
import * as commonRoutes from './routes/common';
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
        const commomRoutes: commonRoutes.Routes = new commonRoutes.Routes();
        const middlewares: commonRoutes.Middlewares = new commonRoutes.Middlewares();
        const product: productRoute.Routes = new productRoute.Routes();

        // index
        router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => commomRoutes.index(req, res, next));

        // setup
        router.get('/setup', (req: express.Request, res: express.Response, next: express.NextFunction) => commomRoutes.setup(req, res, next));

        // route to authenticate a user
        router.post('/authenticate', (req: express.Request, res: express.Response, next: express.NextFunction) => commomRoutes.authenticate(req, res, next, this.express));

        // route middleware to verify a token
        router.use((req, res, next) => middlewares.verifyToken(req, res, next));

        /* GET request for getting all Product. */
        router.get('/product/all', (req: express.Request, res: express.Response, next: express.NextFunction) => product.getAllProducts(req, res, next));

        /* POST request for creating Product. */
        router.post('/product/create', (req: express.Request, res: express.Response, next: express.NextFunction) => product.createProduct(req, res, next));

        /* PUT request for editing a Product. */
        router.put('/product/:id/edit', (req: express.Request, res: express.Response, next: express.NextFunction) => product.editProduct(req, res, next));

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