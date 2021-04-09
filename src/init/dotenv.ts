import fs from 'fs';
import { config } from 'dotenv';

if (fs.existsSync('.env')) {
    config();
} else {
    config({ path: '.env.sample' });
}
