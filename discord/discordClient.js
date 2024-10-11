import { Client, GatewayIntentBits } from 'discord.js';

export const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Function to initialize the bot and listen for events
export const initializeBot = () => {
  bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
  });

  bot.on('messageCreate', (message) => {
    if (message.author.bot) return;
    console.log(`Message from ${message.author.username}: ${message.content}`);
  });
};
