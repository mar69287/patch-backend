import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { initializeBot, initializeTrackerBot } from './discord/discordClient.js';
// import { registerCommands } from './discord/commands/registerCommands.js';
// import { postPatchToTwitter } from './twitter/twitterClient.js';
// import Game from './models/game.js' 

import connectDB from './config/database.js';
import gameRoutes from './routes/gameRoutes.js';
// import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/games', gameRoutes);
// app.use('/api/v1/users', userRoutes);

app.get('/', async (req, res) => {
    res.send('hello from Server Side!');
});

const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    connectDB(process.env.DATABASE_URL);
    app.listen(port, () => console.log(`Express app running on port ${port}`));

    // const randomGame = await Game.aggregate([{ $sample: { size: 1 } }]);

    // if (randomGame.length > 0) {
    //   // Create a fake patch to test posting
    //   const fakePatch = {
    //     title: 'Patch 1.1',
    //     content: 'Bug fixes and performance improvements.',
    //     releaseDate: new Date(),
    //     url: 'https://game-patch.example.com/patch-notes/1.1',
    //     sections: [
    //       {
    //         bullets: ['Improved stability', 'Resolved issue with login', 'Added new character']
    //       }
    //     ]
    //   };

    //   // Post patch to Twitter with random game
    //   await postPatchToTwitter(randomGame[0], fakePatch);
    // }

    // await registerCommands();
    initializeBot(); 
    initializeTrackerBot(); 
  } catch (error) {
    console.log(error);
  }
};

startServer();
