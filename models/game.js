import mongoose from 'mongoose';

// Define the schema for the patch notes
const PatchNoteSchema = new mongoose.Schema({
    title: { type: String }, 
    content: { type: String }, 
    releaseDate: { type: String } 
});

// Define the schema for the game
const GameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String }, 
    background_image: { type: String },
    platforms: { type: [String], required: true }, 
    genres: { type: [String], required: true },
    patchNotes: [PatchNoteSchema], 
}, {
    timestamps: true, 
});

const Game = mongoose.model('Game', GameSchema);

export default Game;

