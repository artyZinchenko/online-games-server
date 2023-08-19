import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const waiting = new Schema({
    id: { type: String, required: true },
    username: { type: String, require: true },
    gameName: { type: String, require: true },
});

waiting.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Waiting = mongoose.model('Waiting', waiting);
export default Waiting;
