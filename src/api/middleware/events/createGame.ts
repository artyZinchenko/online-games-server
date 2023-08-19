import { Server, Socket } from 'socket.io';
import Waiting from '../../models/Waiting';
import { GameData } from '../../models/GameData';

export async function createGame(
    username: string,
    gameName: string,
    socket: Socket,
    io: Server,
    gameData: GameData
) {
    const newWaiting = new Waiting({
        id: socket.id,
        username: username,
        gameName,
    });

    await newWaiting.save();
    gameData.player.createPlayer(socket.id, username);
    io.to(gameData.player.id).emit('waiting_game');
    socket.broadcast.emit('game_created', {
        id: socket.id,
        username,
        gameName,
    });
}
