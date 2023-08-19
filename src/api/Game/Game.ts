import Player from '../Player/Player';

class Game {
    players: Player[];

    constructor() {
        this.players = [];
    }

    addPlayer(player: Player) {
        this.players = [...this.players, player];
    }
}

export default Game;
