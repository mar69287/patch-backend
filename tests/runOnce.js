import fs from 'fs';
import Game from '../models/game.js';
import mongoose from 'mongoose';
import axios from 'axios';
import { queryGemini } from '../gemini/geminiClient.js';

const formatPatchNotes = (geminiResponse) => {
  const firstSentenceMatch = geminiResponse.match(/^(.*?\.\s)/);
  const firstSentence = firstSentenceMatch ? firstSentenceMatch[0] : geminiResponse;

  const sections = [];
  const sectionMatches = geminiResponse.match(/\*\*(.*?)\*\*\n([\s\S]*?)(?=\n\*\*|$)/g);

  if (sectionMatches) {
    sectionMatches.forEach(section => {
      const header = section.match(/\*\*(.*?)\*\*/)[1];
      const bullets = section.match(/\*\s(.*?)(?=\n|$)/g);

      const formattedBullets = bullets ? bullets.map(bullet => bullet.replace(/^\*\s/, '')) : [];

      sections.push({
        subtitle: header,
        bullets: formattedBullets,
      });
    });
  }

  return {
    summary: firstSentence,
    sections: sections,
  };
};

const updatePatchDetails = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database.');

    const games = await Game.find({});

    // Iterate over each game
    for (const game of games) {
      console.log(`Game: ${game.name}`);
      console.log(`Slug: ${game.slug}`);

      // Check if the game has patch notes
      if (game.patchNotes && game.patchNotes.length > 0) {
        for (const patch of game.patchNotes) {
          console.log(`  Patch: ${patch.title}`);
          console.log(`    URL: ${patch.link}`);

          try {
            // Query Gemini for the patch details
            const geminiResponse = await queryGemini(patch.link, patch.title);
            const formattedPatchNotes = formatPatchNotes(geminiResponse);

            // Update the patch's summary and sections
            patch.summary = formattedPatchNotes.summary;
            patch.sections = formattedPatchNotes.sections;

            console.log(`    Updated summary and sections for patch: ${patch.title}`);
          } catch (error) {
            console.error(`Error querying Gemini for patch ${patch.title}:`, error);
          }
        }

        // Save the updated game document
        await game.save();
        console.log(`Saved updates for game: ${game.name}`);
      } else {
        console.log('  No patches available.');
      }

      console.log('====================');
    }

    console.log(`Total number of games processed: ${games.length}`);
    
  } catch (error) {
    console.error('Error updating patches:', error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
};

// Run the function
updatePatchDetails();
