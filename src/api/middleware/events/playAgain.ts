import { Server } from 'socket.io';
import { GameData } from '../../models/GameData';

export async function playAgain(
    io: Server,
    gameData: GameData,
    gameName: string
) {
    try {
        gameData.opponent.playsX = !gameData.opponent.playsX;
        gameData.player.playsX = !gameData.player.playsX;

        const playerObj = {
            username: gameData.player.username,
            id: gameData.player.id,
            playsX: gameData.player.playsX,
        };

        const opponentObj = {
            username: gameData.opponent.username,
            id: gameData.opponent.id,
            playsX: gameData.opponent.playsX,
        };

        io.to(gameData.player.id).emit('started_game', [
            [playerObj, opponentObj],
            gameName,
        ]);

        io.to(gameData.opponent.id).emit('started_game', [
            [playerObj, opponentObj],
            gameName,
        ]);
    } catch (err) {
        let message = 'Error ';
        if (err instanceof Error) {
            message += err.message;
        }
        throw new Error(message);
    }
}
