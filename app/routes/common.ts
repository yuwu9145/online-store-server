'use strict';

import * as express from 'express';
import * as userSchema from '../schemas/user';

import { Observable } from '@reactivex/rxjs';

import * as serverHelper from '../helpers/serverHelper';
import * as jwt from 'jsonwebtoken';

namespace Route {
    export class Routes {
        public index(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.json({ message: 'Welcome to the coolest API on earth!' });
        }
        public setup(req: express.Request, res: express.Response, next: express.NextFunction) {
            const user: userSchema.IUserModel = new userSchema.User({
                name: 'Yuchao Wu',
                password: serverHelper.bcryptGenerateHash('password'),
                admin: true
            });
            user.save((err) => {
                if (err) throw err;
                console.log('User saved successfully');
                res.json({ success: true });
            });
        }
        public authenticate(req: express.Request, res: express.Response, next: express.NextFunction, app: express.Application) {
            // find the user
            userSchema.User.findOne({name: req.body.name}, (err, user) => {
                if (err) throw err;
                if (!user) {
                    res.json({success: false, message: 'Authentication failed. User not found.'});
                } else if (user) {
                    // check if password matches
                    if (!serverHelper.bcryptValidPassword(req.body.password, user.password)) {
                        res.json({success: false, message: 'Authentication failed. Wrong password.'});
                    } else {
                        // if user is found and password is right
                        // create a token with only our given payload
                        const payload = {
                            admin: user.name
                        };

                        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                            expiresIn: '1 days'
                        });
                        // return the information including token as JSON
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                }
            });
        }
    }
    export class Middlewares {
        public verifyToken (req: express.Request, res: express.Response, next: express.NextFunction) {
            // check header or url parameters or post parameters for token
            const token = req.body.token || req.query.token || req.headers['x-access-token'];

            // decode token
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.', error: err});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
                });
            } else {
                // if there is no token
                // return an error
                return res.status(403).send({
                success: false,
                message: 'No token provided.'
                });
            }
        }
    }
}

export = Route;
