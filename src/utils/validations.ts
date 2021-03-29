import Joi from 'joi';

import {
    getRegex,
} from './misc';

import {
    jwtRegex,
    usernameRegex,
    passwordRegex,
} from './regex';

const jwtParam = Joi.object().keys({
    token: Joi.string().pattern(getRegex(jwtRegex)).required(),
}).required();

const userBody = Joi.object().keys({
    username: Joi.string().pattern(getRegex(usernameRegex)).required(),
    password: Joi.string().pattern(getRegex(passwordRegex)).required(),
}).required();

const getUsernameQuery = Joi.object().keys({
    username: Joi.string().pattern(getRegex(usernameRegex)).required(),
}).required();

export {
    userBody,
    jwtParam,
    getUsernameQuery,
};
