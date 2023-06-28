import dotenv from 'dotenv';
import WebSocketServer from './server';

dotenv.config();

const wss = new WebSocketServer(process.env.SERVER_ADDR, 20001);
