import Player from '../Player/Player';
import Game from '../Game/Game';

export interface GameData {
    game: Game;
    player: Player;
    opponent: Player;
}

export interface MoveData {
    player: Player;
    move: number | (number | null)[][];
}

export interface ClientData {
    username: string;
    id: string;
    playsX: boolean;
}
