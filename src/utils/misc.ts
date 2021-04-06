import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Joi from 'joi';

import {
    NextFunction,
    Response,
    Request,
} from 'express';

import {
    jwtSecret,
} from './envs';

import {
    badRequest,
} from './expressResponses';

enum Property {
    query = 'query',
    body = 'body',
    headers = 'headers',
}

const getRegex = (regex: string) => new RegExp(regex);
const hashPassword = (password: string) => crypto.createHash('sha256').update(`${password}.${jwtSecret}`).digest('hex');

const createJwt = (username: string) => jwt.sign({
    username,
}, jwtSecret);

const handleValidations = (schema: Joi.Schema, property: Property) => {
    const validate = (req: Request, res: Response, next: NextFunction) => {
        const {
            error,
        } = schema.validate(req[property]);

        if (!error) {
            return next();
        }

        return badRequest(res);
    };

    return validate;
};

export {
    hashPassword,
    createJwt,
    handleValidations,
    Property,
    getRegex,
};
