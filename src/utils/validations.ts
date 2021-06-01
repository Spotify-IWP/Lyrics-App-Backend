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

export const usernameField = Joi.object().keys({
    username: Joi.string().pattern(getRegex(usernameRegex)).required(),
}).required();

export const passwordField = Joi.object().keys({
    password: Joi.string().pattern(getRegex(passwordRegex)).required(),
}).required();

export const userBody = usernameField.concat(passwordField);

export const lyricsQuery = Joi.object().keys({
    artist: Joi.string().required(),
    song: Joi.string().required(),
}).required();
