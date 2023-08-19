import Player from '../api/Player/Player';
import Game from '../api/Game/Game';

export const initiateData = () => {
    const game = new Game();
    const player = new Player();
    const opponent = new Player();

    return {
        game,
        player,
        opponent,
    };
};
