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

app.post('/discord-webhook', (req, res) => {
  const { username, content } = req.body;

  console.log(`Message from ${username}: ${content}`);


  res.status(200).send('Webhook received!');
});

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