import express from 'express';
import { handleValidations } from '../../utils/misc';
import { Property } from '../../utils/types';

import {
    authorizationHeader,
    getUsernameQuery,
    userBody,
    changePasswordBody,
    changeUsernameBody,
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
    '/user',
    handleValidations(authorizationHeader, Property.headers),
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

router.put(
    '/username',
    handleValidations(changeUsernameBody, Property.body),
    changeUsername,
);

router.put(
    '/password',
    handleValidations(changePasswordBody, Property.body),
    changePassword,
);

router.delete(
    '/user',
    handleValidations(userBody, Property.body),
    deleteUser,
);

export default router;
