import Follow from '../../models/follow.js';
import Game from '../../models/game.js';
import { EmbedBuilder } from 'discord.js';

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
        const game = await Game.findOne({ slug: { $regex: new RegExp(`^${gameName}$`, 'i') } });
        
        if (!game) {
          await interaction.reply(`The game "${gameName}" does not exist. Please make sure you have the correct game ID.`);
          return;
        }

        // 2. Check if the server is following the game
        const follow = await Follow.findOne({ serverId });

        if (!follow || !follow.followedGames.includes(game.slug)) {
          // Server is not following the game
          await interaction.reply(`Your server is not following updates for **${game.name}**.`);
          return;
        }

        // 3. If following, remove the game from the followed list
        follow.followedGames = follow.followedGames.filter(g => g !== game.slug);
        await follow.save(); // Save the updated follow list

        // 4. Success response
        const embed = new EmbedBuilder()
          .setTitle(`Unfollowed: ${game.name}`)
          .setColor('#FF0000') // Red color for unfollow
          .setDescription(`You have successfully unfollowed updates for **${game.name}**.`)
          .setFooter({ text: 'You will no longer receive patch updates for this game.' });

        console.log(`Server ${serverId} has unfollowed game: ${game.name}`);

        await interaction.reply({ embeds: [embed] });

      } catch (error) {
        console.error(`Error while trying to unfollow game ${gameName}:`, error);
        await interaction.reply(`Failed to unfollow **${gameName}**. Please try again later.`);
      }
    },
};
