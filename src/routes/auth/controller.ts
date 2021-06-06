import { Response, Request } from 'express';
import User from '../../models/user';
import { hashPassword, createJwt } from '../../utils/misc';

import {
    usernameRegex,
    passwordRegex,
    jwtRegex,
} from '../../utils/regex';

import {
    unauthorized,
    badRequest,
    serverError,
} from '../../utils/expressResponses';

export const getUser = (req: Request, res: Response) => {
    res.send(res.locals.user);
};

export const getPatterns = (req: Request, res: Response) => {
    res.send({
        usernameRegex,
        passwordRegex,
        jwtRegex,
    });
};

export const getUsername = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            username: req.query.username,
        });
        if (user) {
            return res.send({
                available: false,
            });
        }
        return res.send({
            available: true,
        });
    } catch (e) {
        return serverError(res, e.message);
    }
};

export const changePassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    try {
        await User.findOneAndUpdate({
            username: res.locals.user.username,
        }, {
            password: hashPassword(password),
        });
        res.send({ success: true });
    } catch (e) {
        serverError(res, e.message);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findOneAndDelete({
            username: res.locals.user.username,
        });
        res.send({ success: true });
    } catch (e) {
        serverError(res, e.message);
    }
};

export const changeUsername = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        await User.findOneAndUpdate({
            username: res.locals.user.username,
        }, {
            username,
        });
        res.send({ success: true });
    } catch (e) {
        serverError(res, e.message);
    }
};

export const createUser = async (req: Request, res: Response) => {
    const {
        username,
        password,
    } = req.body;
    const hashedPassword = hashPassword(password);
    try {
        await User.create({
            username,
            password: hashedPassword,
        });
        res.send({
            token: createJwt(username),
        });
    } catch (e) {
        badRequest(res, e.message);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const {
        username,
        password,
    } = req.body;
    try {
        const user = await User.findOne({
            username,
        });
        const hashedPassword = hashPassword(password);
        if (hashedPassword === user.password) {
            return res.send({
                token: createJwt(username),
            });
        }
        return unauthorized(res, 'Error: incorrect password provided');
    } catch (e) {
        return serverError(res, e.message);
    }
};
