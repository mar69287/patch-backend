import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true }, 
    slug: { type: String, required: true, unique: true }, 
    image_background: { type: String, required: true },
});

const Genre = mongoose.model('Genre', GenreSchema);

export default Genre;
