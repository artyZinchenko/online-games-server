import { Socket, Server } from 'socket.io';
// import { GameData } from '../../models/GameData';
import Waiting from '../../models/Waiting';
import { GameData } from '../../models/GameData';

export const leaveGame = async (
    io: Server,
    socket: Socket,
    gameData: GameData
) => {
    try {
        await Waiting.findOneAndDelete({ id: socket.id });
        if (gameData.opponent) {
            io.to(gameData.opponent.id).emit('opponent_disconnected');
        }
    } catch (err) {
        let message = 'Error ';
        if (err instanceof Error) {
            message += err.message;
        }
        throw new Error(message);
    }
};
