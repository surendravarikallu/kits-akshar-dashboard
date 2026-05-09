import path from 'path';
import dotenv from 'dotenv';
const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });
console.log('Dotenv Result:', result.error ? 'Error' : 'Success');
console.log('DATABASE_URL defined:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL starts with:', process.env.DATABASE_URL?.substring(0, 20));
