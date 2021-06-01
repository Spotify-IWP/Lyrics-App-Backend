import { Response } from 'express';

export const badRequest = (res: Response) => res.status(400).json({ message: 'Error: bad request error' });
export const unauthorized = (res: Response) => res.status(401).json({ message: 'UnauthorizedError: unauthorized' });
export const serverError = (res: Response) => res.status(500).json({ message: 'Error: internal server error' });
export const notFound = (res: Response) => res.status(404).json({ message: 'Error: 404 not found' });
