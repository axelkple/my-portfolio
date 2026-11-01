import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// server/config -> up two levels = project root, where .env lives
dotenv.config({ path: path.join(__dirname, '../../.env') });