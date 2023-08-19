import { Socket, Server } from 'socket.io';
import Waiting from '../../models/Waiting';

export async function sendGames(socket: Socket, io: Server) {
    const allGames = await Waiting.find({});

    io.to(socket.id).emit('recieve_games', allGames);
}
