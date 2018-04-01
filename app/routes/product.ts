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
        public editProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
            productSchema.Product.findById(req.params.id, (err, product) => {
                if (err) {
                    res.json({success: false, product: undefined, error: err});
                    return;
                }

                if (product) {
                    product.name = req.body.name || product.name;
                    product.description = req.body.description || product.description;
                    product.price = req.body.price || product.price;
                    product.images = req.body.images || product.images;
                    // Save the updated document back to the database
                    product.save((err, product) => {
                    if (err) {
                        res.json({success: false, error: err});
                    }
                    res.json({success: true, product: product});
                    });
                } else {
                    res.json({success: false, error: 'no product found to edit'});
                }
            });
        }
    }
}

export = Route;
