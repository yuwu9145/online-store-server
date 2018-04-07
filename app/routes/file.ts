'use strict';

import * as express from 'express';
import * as fileHelper from '../helpers/fileHelper';

namespace Route {
    export class Routes {
        public upload(req: express.Request, res: express.Response, next: express.NextFunction) {

            fileHelper.saveFile(req.file.originalname, req.file.buffer).subscribe(
                x => console.log('saving file observable onNext: %s', x),
                e => res.json({
                    success: true,
                    message: e
                }),
                () => res.json({success: true})
            );
        }
    }
}

export = Route;
