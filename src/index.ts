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
app.use(rateLimit());
app.use(express.json());
app.use('/auth', auth);
app.listen(port);
