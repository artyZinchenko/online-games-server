import { Server, Socket } from 'socket.io';
import { GameData } from '../../models/GameData';
import Waiting from '../../models/Waiting';

export async function joinGameById(
    id: string,
    username: string,
    gameName: string,
    socket: Socket,
    socketUsername: string,
    io: Server,
    gameData: GameData
) {
    try {
        console.log('JOIN by ID');
        const { player, opponent, game } = gameData;
        console.log(id, username, gameName);
        console.log(socket.id);

        if (id === socket.id) {
            return;
        }

        player.createPlayer(socket.id, socketUsername);
        opponent.createPlayer(id, username);
        console.log(player, opponent);

        game.addPlayer(player);
        game.addPlayer(opponent);
        await Waiting.findOneAndDelete({ id });

        const randomNumber = Math.random();
        const playsX = randomNumber > 0.5;

        player.playsX = playsX;
        opponent.playsX = !playsX;

        io.to(opponent.id).emit('opponent_joined', [
            [
                {
                    username: opponent.username,
                    id: opponent.id,
                    playsX: !playsX,
                },
                { username: player.username, id: player.id, playsX },
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
