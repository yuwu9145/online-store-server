'use strict';

import * as express from 'express';
import * as fileHelper from '../helpers/fileHelper';
import * as path from 'path';

namespace Route {
    export class Routes {
        public upload(req: express.Request, res: express.Response, next: express.NextFunction) {
            let filename: string = req.file.originalname;
            const fileExtension: string = path.extname(filename);
            filename = `${filename.replace(fileExtension, '')}_${new Date().getTime()}` + fileExtension;
            fileHelper.saveFile(filename, req.file.buffer).subscribe(
                x => console.log('saving file observable onNext: %s', x),
                e => res.json({
                    success: false,
                    message: e
                }),
                () => res.json({success: true})
            );
        }
    }
}

export = Route;
