import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import mongoose from 'mongoose';
import config from './utils/config';
import wsMiddleware from './api/middleware/wsMiddleware';
import { initiateData } from './utils/initiateData';

const app = express();
const server = http.createServer(app);

if (!config.MONGODB_URI) {
    console.error('MONGODB_URI not set in config file');
    process.exit(1);
}

mongoose
    .connect(config.MONGODB_URI)
    .then(() => console.log('connected to MongoDB'))
    .catch((err) => console.log('error connectiong to MongoDB', err.message));

const io = new Server(server, {
    cors: {
        origin: config.FRONT,
        methods: ['GET', 'POST'],
    },
});

const port = 3001;
app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    const gameData = initiateData();

    console.log('user connected');
    wsMiddleware(socket, io, gameData);
});

server.listen(port, () => {
    console.log(`Chat-server listening at http://localhost:${port}`);
});
