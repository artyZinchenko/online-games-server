import { Server } from 'socket.io';
import { ClientData, GameData } from '../../models/GameData';

export async function startGame(
    io: Server,
    players: ClientData[],
    gameData: GameData,
    gameName: string
) {
    try {
        if (!players.some((d) => d.id === gameData.player.id)) return;

        const opponent = players.find((player) => {
            return player.id !== gameData.player.id;
        });
        if (!opponent || !opponent.id || !opponent?.username) return;

        gameData.opponent.createPlayer(opponent.id, opponent.username);
        gameData.opponent.playsX = opponent.playsX;
        gameData.player.playsX = !opponent.playsX;

        io.to(gameData.player.id).emit('started_game', [
            [
                {
                    username: players[0].username,
                    id: players[0].id,
                    playsX: players[0].playsX,
                },
                {
                    username: players[1].username,
                    id: players[1].id,
                    playsX: players[1].playsX,
                },
            ],
            gameName,
        ]);

        io.to(gameData.opponent.id).emit('started_game', [
            [
                {
                    username: players[0].username,
                    id: players[0].id,
                    playsX: players[0].playsX,
                },
                {
                    username: players[1].username,
                    id: players[1].id,
                    playsX: players[1].playsX,
                },
            ],
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
