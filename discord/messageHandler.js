import { savePatchToDatabase } from './databaseUtils.js';
import Game from '../models/game.js';
import axios from 'axios';

// Function to process and save message data
export const handleMessage = async (message) => {
  if (message.embeds.length > 0) {
    const embed = message.embeds[0];

    // Check if embed has an author with a name, if not return early
    if (!embed.author || !embed.author.name) {
      console.log('Embed author name is missing, skipping this message.');
      return;
    }

    const gameName = embed.author.name; 
    console.log(`Processing patch for game: ${gameName}`);

    // Ensure the game exists in the database first
    const game = await Game.findOne({ name: { $regex: new RegExp(`^${gameName}$`, 'i') } });
    
    if (!game) {
      console.log(`Game with name "${gameName}" not found in the database, skipping this patch.`);
      return;
    }

    const description = embed.description || "";
    const splitIndex = description.indexOf('\n-');

    let patchContent = "";
    let bullets = [];

    if (splitIndex !== -1) {
      // Content before '\n-' is the main patch content
      patchContent = description.slice(0, splitIndex).trim();
      
      // Everything after '\n-' are bullet points, split by each subsequent '\n-'
      bullets = description.slice(splitIndex + 1).split('\n-').map(bullet => bullet.trim()).filter(bullet => bullet.length > 0);
    } else {
      patchContent = description.trim();
    }

    const patchDetails = {
      title: embed.title,
      content: patchContent,
      createdAt: message.createdAt,
      url: embed.url,
      bullets: bullets 
    };

    // Save the patch details to the database
    await savePatchToDatabase(game, patchDetails);
  } else {
    console.log('Message does not contain an embed.');
  }
};
