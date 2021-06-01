import Joi from 'joi';
import { getRegex } from './misc';

import {
    jwtRegex,
    usernameRegex,
    passwordRegex,
} from './regex';

export const authorizationHeader = Joi.object().keys({
    authorization: Joi.string().pattern(getRegex(jwtRegex)).required(),
}).required().unknown(true);

export const getUsernameQuery = Joi.object().keys({
    username: Joi.string().pattern(getRegex(usernameRegex)).required(),
}).required();

export const changePasswordBody = Joi.object().keys({
    password: Joi.string().pattern(getRegex(passwordRegex)).required(),
}).required();

export const userBody = getUsernameQuery.concat(changePasswordBody);

export const lyricsQuery = Joi.object().keys({
    artist: Joi.string().required(),
    song: Joi.string().required(),
}).required();
