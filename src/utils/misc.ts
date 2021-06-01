import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { jwtSecret } from './envs';

export const getRegex = (regex: string) => new RegExp(regex);
export const hashPassword = (password: string) => crypto.createHash('sha256').update(`${password}.${jwtSecret}`).digest('hex');
export const createJwt = (username: string) => jwt.sign({ username }, jwtSecret);
