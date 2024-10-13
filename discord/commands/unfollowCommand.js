import Follow from '../../models/follow.js';
import { EmbedBuilder } from 'discord.js'; // Import EmbedBuilder for formatting messages

export const unfollowCommand = {
    name: 'unfollow',
    description: 'Unfollow a game to stop receiving updates',
    options: [
      {
        name: 'game_name',
        description: 'The name of the game you want to unfollow',
        type: 3, // String type
        required: true,
      },
    ],
    async execute(interaction) {
      const gameName = interaction.options.getString('game_name');
      const serverId = interaction.guildId;
  
      try {
        // Simply print the game and server for now (we'll add logic later)
        console.log(`Server ${serverId} requested to unfollow game: ${gameName}`);

        // For now, send a response to the user
        await interaction.reply(`You have requested to unfollow **${gameName}**.`);
      } catch (error) {
        console.error(`Error while trying to unfollow game ${gameName}:`, error);
        await interaction.reply(`Failed to unfollow **${gameName}**. Please try again later.`);
      }
    },
};
