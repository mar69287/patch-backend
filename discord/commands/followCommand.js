// commands/followCommand.js

export const followCommand = {
    name: 'follow',
    description: 'Follow a game to receive updates',
    options: [
      {
        name: 'game_name',
        description: 'The name of the game you want to follow',
        type: 3, 
        required: true,
      },
    ],
    async execute(interaction) {
      const gameName = interaction.options.getString('game_name');
  
      console.log(`User ${interaction.user.tag} is following game: ${gameName}`);
  
      await interaction.reply(`This server will now receive notifications for ${gameName}.`);
    },
};
  