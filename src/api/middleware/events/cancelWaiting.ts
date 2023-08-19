import { Socket } from 'socket.io';
import Waiting from '../../models/Waiting';
import { GameData } from '../../models/GameData';

export const cancelWaiting = async (socket: Socket, gameData: GameData) => {
    await Waiting.findOneAndDelete({ id: socket.id });
    gameData.player.deletePlayer();
    socket.broadcast.emit('game_cancelled', socket.id);
};
