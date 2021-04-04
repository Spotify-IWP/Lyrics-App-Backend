import './init/dotenv';
import './init/db';
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import auth from './routes/auth/auth';

import {
    port,
} from './utils/envs';

const app = express();

app.use(cors());
app.use(express.json());
app.set('trust proxy', true);
app.use(rateLimit());
app.use('/auth', auth);
app.listen(port);
