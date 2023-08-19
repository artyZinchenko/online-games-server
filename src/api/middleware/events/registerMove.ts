import { Server } from 'socket.io';
import { GameData, MoveData } from '../../models/GameData';

export const registerMove = (
    moveData: MoveData,
    io: Server,
    gameData: GameData
) => {
    io.to(gameData.opponent.id).emit('register_move', { move: moveData.move });
};
