import Follow from '../../models/follow.js';
import Game from '../../models/game.js';
import { EmbedBuilder } from 'discord.js'; 

export const followCommand = {
    name: 'follow',
    description: 'Follow a game or feature to receive updates',
    options: [
      {
        name: 'game_name',
        description: 'The name of the game or feature you want to follow',
        type: 3,
        required: true,
      },
    ],
    async execute(interaction) {
      const gameName = interaction.options.getString('game_name');
      const serverId = interaction.guildId;
  
      try {
        const game = await Game.findOne({ slug: { $regex: new RegExp(`^${gameName}$`, 'i') } });
        
        if (!game) {
          // Game doesn't exist in the database
          const notFoundEmbed = new EmbedBuilder()
            .setTitle('Game Not Found')
            .setColor('#FF0000') 
            .setDescription(`The game "${gameName}" does not exist. Please ensure you are adding the correct game ID.`)
            .setFooter({ text: 'Try checking the game name and try again.' });

          await interaction.reply({ embeds: [notFoundEmbed] });
          return;
        }

        // Check if the server is already in the database
        let follow = await Follow.findOne({ serverId });
  
        if (!follow) {
          // If not, create a new entry
          follow = new Follow({ serverId, followedGames: [game.slug] });
        } else {
          if (!follow.followedGames.includes(game.slug)) {
            follow.followedGames.push(game.slug);
          } else {
            // Already following this game
            const alreadyFollowingEmbed = new EmbedBuilder()
              .setTitle('Already Following')
              .setColor('#FFA500') 
              .setDescription(`You are already following updates for **${game.name}**!`)
              .setFooter({ text: 'You will continue to receive updates for this game.' });

            await interaction.reply({ embeds: [alreadyFollowingEmbed] });
            return;
          }
        }
  
        // Save the follow information
        await follow.save();

        // Create the embed message for successful follow
        const successEmbed = new EmbedBuilder()
          .setTitle(`Game Followed`)
          .setColor('#00FF00') 
          .setDescription(`You are now following updates for **${game.name}**!`)
          .setFooter({ text: 'You will receive all updates directly here!' });

        console.log(`Server ${serverId} is now following game: ${gameName}`);
  
        await interaction.reply({ embeds: [successEmbed] }); 
      } catch (error) {
        console.error(`Error while following game ${gameName}:`, error);
        await interaction.reply(`Failed to follow **${gameName}**. Please try again later.`);
      }
    },
};
