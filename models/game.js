import mongoose from 'mongoose';

const Game = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
}, {
    timestamps: true,
});

const GameSchema = mongoose.model('Game', Game)

export default GameSchema;