// commands/followCommand.js

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
  
      // Handle follow logic here
      console.log(`User ${interaction.user.tag} is following game: ${gameName}`);
  
      await interaction.reply(`You are now following updates for ${gameName}.`);
    },
  };
  