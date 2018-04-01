'use strict';

import * as express from 'express';
import * as userSchema from '../schemas/user';

import { Observable } from '@reactivex/rxjs';

import * as serverHelper from '../helpers/serverHelper';

namespace Route {
    export class Index {
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
    }
}

export = Route;
