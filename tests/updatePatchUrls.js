import fs from 'fs';
import Game from '../models/game.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const updatePatchUrls = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database.');

    // Read the combined_games_and_patches.json file
    const data = fs.readFileSync('combined_games_and_patches.json', 'utf-8');
    const games = JSON.parse(data);

    // Iterate over each game and update the corresponding patch URLs in the database
    for (const game of games) {
      const dbGame = await Game.findOne({ slug: game.gameSlug });
    
        // console.log(dbGame.name)
      if (!dbGame) {
        console.log(`Game not found in the database: ${game.gameName}`);
        continue;
      }

      for (const patch of game.patches) {
        // Find the patch in the database by comparing the patch title
        const patchToUpdate = dbGame.patchNotes.find(p => p.title === patch.patchTitle);

        if (!patchToUpdate) {
          console.log(`Patch not found for game: ${game.gameName}, patch: ${patch.patchTitle}`);
          continue;
        }

        // Update the URL for the patch
        patchToUpdate.link = patch.url;
      }

      // Save the updated game document
      await dbGame.save();
      console.log(`Updated patch URLs for game: ${game.gameName}`);
    }

    console.log('All patch URLs have been updated successfully.');
  } catch (error) {
    console.error('Error updating patch URLs:', error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
};

// Run the function
updatePatchUrls();
