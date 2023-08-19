import { Socket, Server } from 'socket.io';
import Waiting from '../../models/Waiting';
import { GameData } from '../../models/GameData';

export async function joinGame(
    username: string,
    gameName: string,
    socket: Socket,
    io: Server,
    gameData: GameData
) {
    const { player, opponent, game } = gameData;
    const waiting = await Waiting.find({ gameName });

    if (waiting.length < 1) {
        const newWaiting = new Waiting({
            id: socket.id,
            username: username,
            gameName,
        });

        await newWaiting.save();
        player.createPlayer(socket.id, username);

        io.to(player.id).emit('waiting_game');
    } else {
        if (!waiting[0].username) return;
        if (waiting[0].id === socket.id) {
            return;
        }

        player.createPlayer(socket.id, username);
        opponent.createPlayer(waiting[0].id, waiting[0].username);

        game.addPlayer(player);
        game.addPlayer(opponent);
        await Waiting.deleteMany({});

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
    }
}
