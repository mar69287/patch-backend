// discord/commands/registerCommands.js
import { REST, Routes } from 'discord.js';
import { followCommand } from './followCommand.js'; 
import { unfollowCommand } from './unfollowCommand.js'; // Add the new unfollow command

// Function to register the commands
export const registerCommands = async () => {
  const DISCORD_TRACKER_BOT_TOKEN = process.env.DISCORD_TRACKER_BOT_TOKEN;
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const commands = [
    followCommand, 
    unfollowCommand, 
  ];

  const rest = new REST({ version: '10' }).setToken(DISCORD_TRACKER_BOT_TOKEN);

  try {
    console.log('Started registering application (/) commands.');

    await rest.put(
      Routes.applicationCommands(CLIENT_ID), 
      { body: commands }
    );

    console.log('Successfully registered application (/) commands.');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
};
