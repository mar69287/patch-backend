// test/checkFailedPatches.js

import mongoose from 'mongoose';
import Game from '../models/game.js';
import dotenv from 'dotenv';
import { updatePatchDetails } from '../gemini/databaseUpdate.js';

dotenv.config();

const checkFailedPatches = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database.');

    // Find all games with patches where the summary is "Failed to generate content"
    const gamesWithFailedPatches = await Game.find({
      'patchNotes.summary': 'Failed to generate content'
    });

    // Retry updating each failed patch
    for (const game of gamesWithFailedPatches) {
      console.log(`Game: ${game.name}`);
      console.log(`Slug: ${game.slug}`);

      for (const patch of game.patchNotes) {
        if (patch.summary === 'Failed to generate content') {
          console.log(`  Patch Title: ${patch.title}`);
          console.log(`  Patch URL: ${patch.link}`);
          console.log('---');

          // Try updating the patch details
        //   try {
        //     await updatePatchDetails(game, patch);
        //     console.log(`Retried updating patch: ${patch.title}`);
        //   } catch (updateError) {
        //     console.error(`Failed to update patch: ${patch.title}`, updateError);
        //   }
        }
      }
      console.log('====================');
    }

    if (gamesWithFailedPatches.length === 0) {
      console.log('No games with patches that have "Failed to generate content" as the summary.');
    }

    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from the database.');
  } catch (error) {
    console.error('Error checking for failed patches:', error);
    await mongoose.disconnect();
  }
};

// Run the function
checkFailedPatches();
