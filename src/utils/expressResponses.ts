import { Response } from 'express';

const badRequest = (res: Response) => res.status(400).json('Error: bad request error');
const unauthorized = (res: Response) => res.status(401).json('UnauthorizedError: unauthorized');
const serverError = (res: Response) => res.status(500).json('Error: internal server error');

export {
    badRequest,
    unauthorized,
    serverError,
};
