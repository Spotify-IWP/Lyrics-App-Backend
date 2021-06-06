import { Response, Request } from 'express';
import User from '../../models/user';
import { hashPassword, createJwt } from '../../utils/misc';

import {
    usernameRegex,
    passwordRegex,
    jwtRegex,
} from '../../utils/regex';

import {
    badRequest,
    serverError,
    notFound,
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
        const user = await User.findOneAndUpdate({
            username: res.locals.user.username,
        }, {
            password: hashPassword(password),
        });

        if (!user) {
            return notFound(res, 'Error: user not found');
        }
        return res.send({ success: true });
    } catch (e) {
        return serverError(res, e.message);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({
            username: res.locals.user.username,
        });

        if (!user) {
            return notFound(res, 'Error: user not found');
        }
        return res.send({ success: true });
    } catch (e) {
        return serverError(res, e.message);
    }
};

export const changeUsername = async (req: Request, res: Response) => {
    const { username } = req.body;
    try {
        const user = await User.findOneAndUpdate({
            username: res.locals.user.username,
        }, {
            username,
        });

        if (!user) {
            return notFound(res, 'Error: user not found');
        }
        return res.send({ success: true });
    } catch (e) {
        return serverError(res, e.message);
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
            password: hashPassword(password),
        });
        if (user) {
            return res.send({
                token: createJwt(username),
            });
        }
        return notFound(res, 'Error: no user found matching the provided username and password');
    } catch (e) {
        return serverError(res, e.message);
    }
};
