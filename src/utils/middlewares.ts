import {
    NextFunction,
    Response,
    Request,
} from 'express';

import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { jwtSecret } from './envs';
import { badRequest, unauthorized } from './expressResponses';
import { JWTBody, Property } from './types';

export const handleValidations = (schema: Joi.Schema, property: Property) => {
    const validate = (req: Request, res: Response, next: NextFunction) => {
        const {
            error,
        } = schema.validate(req[property]);

        if (!error) {
            return next();
        }

        return badRequest(res, error.message);
    };

    return validate;
};

export const setUser = (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req;
    jwt.verify(headers.authorization!, jwtSecret, (err, body?: JWTBody) => {
        if (err) {
            return unauthorized(res);
        }

        res.locals.user = {
            username: body!.username,
        };
        return next();
    });
};
