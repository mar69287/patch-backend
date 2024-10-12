import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { handleMessage } from './messageHandler.js';

// Initialize the first bot (Patch Listener)
export const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Initialize the second bot (Patch Tracker)
export const trackerBot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Function to initialize the first bot (Patch Listener)
export const initializeBot = () => {
  bot.once('ready', () => {
    console.log(`Patch Listener Bot logged in as ${bot.user.tag}!`);
  });

  bot.on('messageCreate', async (message) => {
    try {
      console.log(`Message from ${message.author.username}: ${message.content}`);
      // Pass the message to the message handler
      await handleMessage(message);
    } catch (error) {
      console.error('Error processing message in Patch Listener:', error.message);
    }
  });

  // Log in with the bot token for the first bot
  bot.login(process.env.DISCORD_BOT_TOKEN);
};


// Function to initialize the second bot (Patch Tracker)
export const initializeTrackerBot = () => {

    trackerBot.once('ready', () => {
        console.log(`Patch Tracker Bot logged in as ${trackerBot.user.tag}!`);
    });
  
    // Listen for interaction (slash commands)
    trackerBot.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;
  
      const { commandName, options } = interaction;
  
      if (commandName === 'follow') {
        const gameName = options.getString('game_name'); // Get the game name from the slash command
        await handleFollowCommand(interaction, gameName); // Pass the interaction and game name to the handler
      }
    });
  
    trackerBot.login(process.env.DISCORD_TRACKER_BOT_TOKEN);
};
