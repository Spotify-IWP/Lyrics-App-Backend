import Joi from 'joi';
import { getRegex } from './misc';

import {
    jwtRegex,
    usernameRegex,
    passwordRegex,
} from './regex';

const authorizationHeader = Joi.object().keys({
    authorization: Joi.string().pattern(getRegex(jwtRegex)).required(),
}).required().unknown(true);

const getUsernameQuery = Joi.object().keys({
    username: Joi.string().pattern(getRegex(usernameRegex)).required(),
}).required();

const userBody = getUsernameQuery.concat(Joi.object().keys({
    password: Joi.string().pattern(getRegex(passwordRegex)).required(),
}).required());

const changeUsernameBody = userBody.concat(Joi.object().keys({
    newUsername: Joi.string().pattern(getRegex(usernameRegex)).required(),
}).required());

const changePasswordBody = userBody.concat(Joi.object().keys({
    newPassword: Joi.string().pattern(getRegex(passwordRegex)).required(),
}).required());

export {
    userBody,
    authorizationHeader,
    getUsernameQuery,
    changePasswordBody,
    changeUsernameBody,
};
