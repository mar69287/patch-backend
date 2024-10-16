import mongoose from 'mongoose';

const PatchNoteSchema = new mongoose.Schema({
    title: { type: String }, 
    content: { type: String }, 
    releaseDate: { type: String }, 
    link: { type: String }, 
    summary: { type: String },
    sections: [{ 
        subtitle: { type: String }, 
        bullets: { type: [String] } 
    }] 
});

const GameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String }, 
    background_image: { type: String },
    platforms: { type: [String], required: true }, 
    genres: { type: [String], required: true },
    patchNotes: [PatchNoteSchema],
    released: { type: [String], required: true }
}, {
    timestamps: true, 
});

const Game = mongoose.model('Game', GameSchema);

export default Game;

