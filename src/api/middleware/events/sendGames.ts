import { Socket, Server } from 'socket.io';
import Waiting from '../../models/Waiting';

export async function sendGames(socket: Socket, io: Server) {
    try {
        const allGames = await Waiting.find({});

        io.to(socket.id).emit('recieve_games', allGames);
    } catch (err) {
        let message = 'Error ';
        if (err instanceof Error) {
            message += err.message;
        }
        throw new Error(message);
    }
}
