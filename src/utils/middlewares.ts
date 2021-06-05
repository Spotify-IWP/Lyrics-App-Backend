import {
    NextFunction,
    Response,
    Request,
} from 'express';

import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { Types } from 'mongoose';
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

        return badRequest(res, `${property}: ${error.message}`);
    };

    return validate;
};

export const validateMongoDBObjectId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const castedId = new Types.ObjectId(id);

    if (id === castedId.toHexString()) {
        return next();
    }

    return badRequest(res, 'params: id is not a valid MongoDB ObjectID');
};

export const setUser = (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req;
    jwt.verify(headers.authorization!, jwtSecret, (err, body?: JWTBody) => {
        if (err) {
            return unauthorized(res, err.message);
        }

        res.locals.user = {
            username: body!.username,
        };
        return next();
    });
};
