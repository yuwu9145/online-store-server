'use strict';

import { Observable, Observer } from '@reactivex/rxjs';
import * as fs from 'fs';

namespace FileHelper {
    export function saveFile(filename: string, buffer: Buffer): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next(filename);
            fs.writeFile(`process.env.UPLOAD_FILES_PATH/${filename}`, buffer, (err) => {
                if (err) observer.error(err);
                observer.complete();
            });
        });
    }
}

export = FileHelper;