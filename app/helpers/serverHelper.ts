'use strict';

import * as bcrypt from 'bcrypt-nodejs';

namespace AppHelper {
    export function bcryptValidPassword(password: string, passwordHash: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), undefined);
    }
    export function bcryptGenerateHash(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), undefined);
    }
}

export = AppHelper;