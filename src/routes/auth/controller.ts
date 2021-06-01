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
    res.json(res.locals.user);
};

export const getPatterns = (req: Request, res: Response) => {
    res.json({
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
            return res.json({
                available: false,
            });
        }
        return res.json({
            available: true,
        });
    } catch {
        return serverError(res);
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
        return res.json({ success: true });
    } catch {
        return serverError(res);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findOneAndDelete({
            username: res.locals.user.username,
        });
        return res.json({ success: true });
    } catch {
        return serverError(res);
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
        return res.json({ success: true });
    } catch {
        return serverError(res);
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
        res.json({
            token: createJwt(username),
        });
    } catch {
        badRequest(res);
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
            return res.json({
                token: createJwt(username),
            });
        }
        return unauthorized(res);
    } catch {
        return serverError(res);
    }
};
