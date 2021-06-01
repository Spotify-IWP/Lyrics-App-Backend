import express from 'express';
import { setUser, handleValidations } from '../../utils/middlewares';
import { Property } from '../../utils/types';

import {
    authorizationHeader,
    getUsernameQuery,
    userBody,
    changePasswordBody,
} from '../../utils/validations';

import {
    getUser,
    getPatterns,
    createUser,
    getUsername,
    loginUser,
    changePassword,
    changeUsername,
    deleteUser,
} from './controller';

const router = express.Router();

router.get(
    '/patterns',
    getPatterns,
);

router.get(
    '/username',
    handleValidations(getUsernameQuery, Property.query),
    getUsername,
);

router.post(
    '/signup',
    handleValidations(userBody, Property.body),
    createUser,
);

router.post(
    '/login',
    handleValidations(userBody, Property.body),
    loginUser,
);

router.use(
    handleValidations(authorizationHeader, Property.headers),
    setUser,
);

router.get(
    '/user',
    getUser,
);

router.put(
    '/username',
    handleValidations(getUsernameQuery, Property.body),
    changeUsername,
);

router.put(
    '/password',
    handleValidations(changePasswordBody, Property.body),
    changePassword,
);

router.delete(
    '/user',
    deleteUser,
);

export default router;
