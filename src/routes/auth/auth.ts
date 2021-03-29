import express from 'express';

import {
    Property,
    handleValidations,
} from '../../utils/misc';

import {
    jwtParam,
    getUsernameQuery,
    userBody,
} from '../../utils/validations';

import {
    getUser,
    getPatterns,
    createUser,
    getUsername,
    loginUser,
} from './controller';

const router = express.Router();

router.get(
    '/user/:token',
    handleValidations(jwtParam, Property.params),
    getUser,
);

router.get(
    '/patterns',
    getPatterns,
);

router.post(
    '/signup',
    handleValidations(userBody, Property.body),
    createUser,
);

router.get(
    '/username',
    handleValidations(getUsernameQuery, Property.query),
    getUsername,
);

router.post(
    '/login',
    handleValidations(userBody, Property.body),
    loginUser,
);

export default router;
