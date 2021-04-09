import mongoose from 'mongoose';
import { dbURL } from '../utils/envs';

mongoose
    .connect(dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
