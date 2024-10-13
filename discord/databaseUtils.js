import { trackerBot } from './discordClient.js'; 
import pkg from 'discord.js';
const { EmbedBuilder } = pkg; 
import Follow from '../models/follow.js';
import { postPatchToTwitter } from '../twitter/twitterClient.js';

export const savePatchToDatabase = async (game, patchDetails) => {
  try {
    const newPatchNote = {
      title: patchDetails.title,
      content: patchDetails.content,
      releaseDate: patchDetails.createdAt.toISOString(),
      link: patchDetails.url,
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

    // After saving the game, send the latest patch to the Discord server and post to twitter
    await sendPatchToDiscord(game, newPatchNote);
    await postPatchToTwitter(game, newPatchNote);
    
  } catch (error) {
    console.error('Error saving patch to the database:', error.message);
  }
};

// Function to send the patch note to the Discord server via trackerBot
const sendPatchToDiscord = async (game, patchNote) => {
  try {
    const followers = await Follow.find({ followedGames: game.slug });

    if (!followers.length) {
      console.log(`No servers following game: ${game.name}`);
      return;
    }

    // Create the embed message
    const embed = new EmbedBuilder() 
      .setTitle(`New Patch Update for ${game.name}`)
      .setColor('#0099ff') 
      .setDescription(patchNote.content)
      .addFields(
        { name: 'Title', value: patchNote.title, inline: false }, 
        { name: 'Release Date', value: patchNote.releaseDate, inline: true }, 
        { 
          name: 'Patch Details', 
          value: patchNote.sections.length > 0 ? patchNote.sections[0].bullets.join('\n- ') : 'No details available', 
          inline: false 
        }
      )
      .setURL(patchNote.link) 
      .setFooter({ text: `Game: ${game.name}` })
      .setTimestamp();

    // Send to each server that follows this game
    for (const follower of followers) {
      const serverId = follower.serverId;
      const guild = trackerBot.guilds.cache.get(serverId);
      if (guild) {
        const defaultChannel = guild.systemChannel || guild.channels.cache.find(ch => ch.type === 'GUILD_TEXT');
        if (defaultChannel) {
          await defaultChannel.send({ embeds: [embed] });
          console.log(`Patch for game "${game.name}" sent to server: ${guild.name}`);
        } else {
          console.error(`No appropriate text channel found in server: ${guild.name}`);
        }
      } else {
        // Bot is not in the server, deleting entry from the Follow model
        console.error(`Bot is not in the server with ID: ${serverId}`);
        await Follow.deleteOne({ serverId });
        console.log(`Server with ID ${serverId} has been removed from the follow list.`);
      }
    }
  } catch (error) {
    console.error('Error sending patch to Discord:', error.message);
  }
};
