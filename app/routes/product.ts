'use strict';

import * as express from 'express';
import * as productSchema from '../schemas/product';
import * as ShortUniqueId from 'short-unique-id';

namespace Route {
    export class Routes {
        uid;
        constructor() {
            this.uid = new ShortUniqueId();
        }
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
        public createProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
            const product: productSchema.IProductModel  = new productSchema.Product({
                name: req.body.name,
                sku: this.uid.randomUUID(5),
                description: req.body.description,
                price: req.body.price,
                images: []
            });

            product.save((err, instance) => {
                if (err) {
                    res.json(err);
                    return;
                }
                // saved!
                res.json(instance);
            });
        }
    }
}

export = Route;
