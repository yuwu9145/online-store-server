'use strict';

import * as express from 'express';
import * as productSchema from '../schemas/product';

namespace Route {
    export class Routes {
        public getAllProducts(req: express.Request, res: express.Response, next: express.NextFunction) {
            productSchema.Product.find({}, (err, products) => {
                if (err) {
                  res.json(undefined);
                  return;
                }
                // get all products
                res.json(products);
              });
        }
    }
}

export = Route;
