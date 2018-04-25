'use strict';

import * as express from 'express';
import * as fileHelper from '../helpers/fileHelper';
import * as path from 'path';

namespace Route {
    export class Routes {
        public upload(req: express.Request, res: express.Response, next: express.NextFunction) {
            let filename: string = req.file.originalname;
            let res_filename: string = undefined;

            const fileExtension: string = path.extname(filename);
            filename = `${filename.replace(fileExtension, '')}_${new Date().getTime()}` + fileExtension;
            fileHelper.saveFile(filename, req.file.buffer).subscribe(
                x => res_filename = x,
                e => res.json({
                    success: false,
                    message: e
                }),
                () => res.json({filename: res_filename})
            );
        }
    }
}

export = Route;
