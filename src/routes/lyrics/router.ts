import express, { } from 'express';
import { setUser, handleValidations } from '../../utils/middlewares';
import { Property } from '../../utils/types';
import { authorizationHeader, lyricsQuery, id } from '../../utils/validations';
import { getLyrics, getHistory, clearHistory } from './controller';

const router = express.Router();

router.use(
    handleValidations(authorizationHeader, Property.headers),
    setUser,
);

router.get(
    '/search',
    handleValidations(lyricsQuery, Property.query),
    getLyrics,
);

router.get(
    '/history',
    getHistory,
);

router.delete(
    '/history/:id',
    handleValidations(id, Property.params),
    clearHistory,
);

router.delete(
    '/history',
    clearHistory,
);

export default router;
