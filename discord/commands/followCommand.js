import Follow from '../../models/follow.js';
import Game from '../../models/game.js'

export const followCommand = {
    name: 'follow',
    description: 'Follow a game or feature to receive updates',
    options: [
      {
        name: 'game_name',
        description: 'The name of the game or feature you want to follow',
        type: 3, // String type
        required: true,
      },
    ],
    async execute(interaction) {
      const gameName = interaction.options.getString('game_name');
      const serverId = interaction.guildId;
  
      try {
        // Check if the game exists in the database (case-insensitive)
        const game = await Game.findOne({ slug: { $regex: new RegExp(`^${gameName}$`, 'i') } });
        
        if (!game) {
          await interaction.reply(`The game "${gameName}" does not exist. Please ensure you are adding correct game id.`);
          return;
        }

        // Check if the server is already in the database
        let follow = await Follow.findOne({ serverId });
  
        if (!follow) {
          // If not, create a new entry
          follow = new Follow({ serverId, followedGames: [game.slug] });
        } else {
          // Add the game slug to the followedGames list if not already followed
          if (!follow.followedGames.includes(game.slug)) {
            follow.followedGames.push(game.slug);
          } else {
            await interaction.reply(`You are already following updates for ${gameName}.`);
            return;
          }
        }
  
        // Save the follow information
        await follow.save();
  
        console.log(`Server ${serverId} is now following game: ${gameName}`);
  
        await interaction.reply(`You are now following updates for ${gameName}! Future updates will be posted here.`);
      } catch (error) {
        console.error(`Error while following game ${gameName}:`, error);
        await interaction.reply(`Failed to follow ${gameName}. Please try again later.`);
      }
    },
};
