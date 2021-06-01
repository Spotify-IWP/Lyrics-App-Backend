import { Response } from 'express';

export const badRequest = (res: Response, msg?: string) => res.status(400).json({ message: msg || 'Error: bad request error' });
export const unauthorized = (res: Response, msg?: string) => res.status(401).json({ message: msg || 'UnauthorizedError: unauthorized' });
export const serverError = (res: Response, msg?: string) => res.status(500).json({ message: msg || 'Error: internal server error' });
export const notFound = (res: Response, msg?: string) => res.status(404).json({ message: msg || 'Error: 404 not found' });
