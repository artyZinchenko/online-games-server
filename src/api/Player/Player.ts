class Player {
    _username: string | null;
    _id: string | null;
    playsX: boolean | null;

    constructor() {
        this._username = null;
        this._id = null;
        this.playsX = null;
    }

    createPlayer(id: string, username: string) {
        (this._username = username), (this._id = id);
    }

    deletePlayer() {
        (this._username = null), (this._id = null);
    }

    get username(): string {
        return this._username || 'No username available';
    }

    get id(): string {
        return this._id || 'No ID available';
    }
}

export default Player;
