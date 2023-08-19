import { Server } from 'socket.io';
import { GameData, MoveData } from '../../models/GameData';

export const registerMove = (
    moveData: MoveData,
    io: Server,
    gameData: GameData
) => {
    try {
        io.to(gameData.opponent.id).emit('register_move', {
            move: moveData.move,
        });
    } catch (err) {
        let message = 'Error ';
        if (err instanceof Error) {
            message += err.message;
        }
        throw new Error(message);
    }
};
