import jwt from 'jsonwebtoken';

import {
    Response,
    Request,
} from 'express';

import {
    hashPassword,
    createJwt,
} from '../../utils/misc';

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

import {
    jwtSecret,
} from '../../utils/envs';

import User from '../../models/user';

const getUser = (req: Request, res: Response) => {
    const { Authorization } = <{ Authorization?: string }>req.headers;
    jwt.verify(Authorization!, jwtSecret, (err, body?: { username?: string }) => {
        if (err) {
            return unauthorized(res);
        }
        return res.json({
            username: body!.username,
        });
    });
};

const getPatterns = (req: Request, res: Response) => {
    res.json({
        usernameRegex,
        passwordRegex,
        jwtRegex,
    });
};

const getUsername = async (req: Request, res: Response) => {
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

const changePassword = async (req: Request, res: Response) => {
    const {
        username,
        password,
        newPassword,
    } = req.body;
    try {
        const user = await User.findOneAndUpdate({
            username,
            password: hashPassword(password),
        },
        {
            password: hashPassword(newPassword),
        });
        return user ? res.json({ success: true }) : badRequest(res);
    } catch {
        return serverError(res);
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const {
        username,
        password,
    } = req.body;
    try {
        const user = await User.findOneAndDelete({
            username,
            password: hashPassword(password),
        });
        return user ? res.json({ success: true }) : unauthorized(res);
    } catch {
        return serverError(res);
    }
};

const changeUsername = async (req: Request, res: Response) => {
    const {
        username,
        password,
        newUsername,
    } = req.body;
    try {
        const user = await User.findOneAndUpdate({
            username,
            password: hashPassword(password),
        },
        {
            username: newUsername,
        });
        return user ? res.json({ success: true }) : badRequest(res);
    } catch {
        return serverError(res);
    }
};

const createUser = async (req: Request, res: Response) => {
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

const loginUser = async (req: Request, res: Response) => {
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

export {
    getUser,
    getPatterns,
    createUser,
    getUsername,
    loginUser,
    changePassword,
    changeUsername,
    deleteUser,
};
