import './init/dotenv';
import './init/db';

import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import lyrics from './routes/lyrics/router';
import auth from './routes/auth/router';
import { port } from './utils/envs';

const app = express();

app.use(cors());
app.use(express.json());
app.set('trust proxy', true);
app.use(rateLimit({ message: 'Error: Too many requests' }));
app.use('/auth', auth);
app.use('/lyrics', lyrics);
app.listen(port);
