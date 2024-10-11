import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
// import Game from './models/game.js'
// import { patchNotes } from './patchNotesData.js';

import connectDB from './config/database.js';
// import userRoutes from './routes/userRoutes.js';
import gameRoutes from './routes/gameRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// app.use('/api/v1/users', userRoutes)
app.use('/api/v1/games', gameRoutes)

app.get('/', async (req, res) => {
    res.send('hello from Server Side!')
});

// const addPatchNotesToGames = async () => {
//   try {
//     for (const { slug, patchNotes: notes } of patchNotes) {
//       // Find the game by slug
//       const game = await Game.findOne({ slug });

//       if (game) {
//         // Add the patch notes to the game
//         game.patchNotes = game.patchNotes.concat(notes); // Concatenate existing notes with new ones

//         // Save the updated game
//         await game.save();
//         console.log(`Patch notes added to game: ${game.name}`);
//       } else {
//         console.log(`Game with slug "${slug}" not found.`);
//       }
//     }
//   } catch (error) {
//     console.error('Error adding patch notes to games:', error);
//   }
// };


const port = process.env.PORT || 8080;

const startServer = async () => {
    try {
      connectDB(process.env.DATABASE_URL);
      app.listen(port, () => console.log(`Express app running on port ${port}`));
    } catch (error) {
      console.log(error);
    }
};
  
startServer();