import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const FRONT = process.env.FRONT;

export default { MONGODB_URI, FRONT };
