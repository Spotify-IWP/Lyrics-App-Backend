import { existsSync } from 'fs';
import { config } from 'dotenv';

if (existsSync('.env')) {
    config({ path: '.env' });
} else {
    config({ path: '.env.sample' });
}
