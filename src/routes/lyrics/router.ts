import express, { } from 'express';
import { setUser, handleValidations } from '../../utils/middlewares';
import { Property } from '../../utils/types';
import { authorizationHeader, lyricsQuery } from '../../utils/validations';
import { getLyrics, getHistory } from './controller';

const router = express.Router();

router.use(handleValidations(
    authorizationHeader, Property.headers,
),
setUser);

router.get(
    '/search',
    handleValidations(lyricsQuery, Property.query),
    getLyrics,
);

router.get(
    '/history',
    getHistory,
);

export default router;
