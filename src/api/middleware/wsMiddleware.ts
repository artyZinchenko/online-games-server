import { Socket, Server } from 'socket.io';
import { joinGame } from './events/joinGame';
import { registerMove } from './events/registerMove';
import { ClientData, GameData } from '../models/GameData';
import { leaveGame } from './events/leaveGame';
import { startGame } from './events/startGame';
import { playAgain } from './events/playAgain';
import { cancelWaiting } from './events/cancelWaiting';
import Waiting from '../models/Waiting';
import { createGame } from './events/createGame';
import { joinGameById } from './events/joinGameById';
import { sendGames } from './events/sendGames';

const wsMiddleware = async (socket: Socket, io: Server, gameData: GameData) => {
    try {
        socket.on('get_games', async () => sendGames(socket, io));

        socket.on('join_game', async (clientData) => {
            const { username, gameName } = clientData;
            return await joinGame(username, gameName, socket, io, gameData);
        });

        socket.on('create_game', async (clientData) => {
            const { username, gameName } = clientData;
            return await createGame(username, gameName, socket, io, gameData);
        });

        socket.on('join_game_byId', async (clientData) => {
            const { id, username, gameName } = clientData;
            return await joinGameById(
                id,
                username,
                gameName,
                socket,
                io,
                gameData
            );
        });

        socket.on('start_game', (clientData) => {
            const players: ClientData[] = clientData[0];
            const gameName: string = clientData[1];
            startGame(io, players, gameData, gameName);
        });

        socket.on('move', (moveData) => registerMove(moveData, io, gameData));

        socket.on('win', () => {
            io.to(gameData.opponent.id).emit('you_lose');
            io.to(gameData.player.id).emit('you_win');
        });

        socket.on('draw', () => {
            io.to(gameData.opponent.id).emit('you_draw');
            io.to(gameData.player.id).emit('you_draw');
        });

        socket.on('request_again', () =>
            io.to(gameData.opponent.id).emit('suggest_again')
        );

        socket.on('confirm_again', (gameName) =>
            playAgain(io, gameData, gameName)
        );
        socket.on('cancel_waiting', async () =>
            cancelWaiting(socket, gameData)
        );

        socket.on('leave', () => leaveGame(io, socket, gameData));
        socket.on(
            'disconnect',
            async () => await Waiting.findOneAndDelete({ id: socket.id })
        );
    } catch (err) {
        console.log(err);
    }
};

export default wsMiddleware;
