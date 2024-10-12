import { Client, GatewayIntentBits } from 'discord.js';
import Game from '../models/game.js';

// Initialize the bot client
export const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Function to process and save message data
const saveMessageToFile = async (message) => {
  if (message.embeds.length > 0) {

    const embed = message.embeds[0];

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
      title: embed.title || "No Title Provided",
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

// Function to save patch details to the database with your schema
const savePatchToDatabase = async (game, patchDetails) => {
  try {

    const newPatchNote = {
      title: patchDetails.title || "No Title Provided",
      content: patchDetails.content || "No Description Provided",
      releaseDate: patchDetails.createdAt.toISOString(), 
      link: patchDetails.url || "",
      sections: [
        {
          bullets: patchDetails.bullets || [],
        }
      ]
    };

    // Add the new patch note to the game's patchNotes array
    game.patchNotes.push(newPatchNote);
    
    // Save the updated game
    await game.save();
    
    console.log(`Patch for game "${game.name}" has been added to the database.`);
  } catch (error) {
    console.error('Error saving patch to the database:', error.message);
  }
};

// Function to initialize the bot and listen for events
export const initializeBot = () => {
  bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
  });

  bot.on('messageCreate', async (message) => {
    try {
      console.log(`Message from ${message.author.username}: ${message.content}`);
      // Save the message data to the JSON file and database
      await saveMessageToFile(message);
    } catch (error) {
      console.error('Error processing message:', error.message);
    }
  });
};
