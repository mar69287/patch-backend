import { trackerBot } from './discordClient.js'; 
import pkg from 'discord.js';
const { EmbedBuilder } = pkg; 
import Follow from '../models/follow.js';
import { postPatchToTwitter } from '../twitter/twitterClient.js';
import axios from 'axios';
import { updatePatchDetails } from '../gemini/databaseUpdate.js';

const resolveFinalUrl = async (shortUrl) => {
  try {
    // Make a request to the shortened URL and follow redirects
    const response = await axios.get(shortUrl, { maxRedirects: 5 });
    
    // The final URL after redirects
    return response.request.res.responseUrl;
  } catch (error) {
    console.error('Error resolving final URL:', error);
    return shortUrl; // Fall back to the shortened URL if there's an error
  }
};

export const savePatchToDatabase = async (game, patchDetails) => {
  try {
    const finalUrl = await resolveFinalUrl(patchDetails.url);
    console.log('final url in discord sample:', finalUrl)
    const newPatchNote = {
      title: patchDetails.title,
      content: patchDetails.content,
      releaseDate: patchDetails.createdAt.toISOString(),
      link: finalUrl,
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

    // After saving the game, send the latest patch to the Discord server, post to twitter and update patch details with gemini
    await sendPatchToDiscord(game, newPatchNote);
    await postPatchToTwitter(game, newPatchNote);
    await updatePatchDetails(game, newPatchNote);
    
  } catch (error) {
    console.error('Error saving patch to the database:', error.message);
  }
};

// Function to send the patch note to the Discord server via trackerBot
const sendPatchToDiscord = async (game, patchNote) => {
  try {
    const followers = await Follow.find({ followedGames: game.slug });
    console.log({ game });
    console.log({ followers });

    if (!followers.length) {
      console.log(`No servers following game: ${game.name}`);
      return;
    }

    // Validate fields before creating the embed
    const title = patchNote.title || 'No title available';
    const releaseDate = new Date(patchNote.releaseDate).toLocaleDateString() || 'Unknown date';
    const patchDetails = patchNote.sections.length > 0 ? patchNote.sections[0].bullets.join('\n- ').slice(0, 1024) : 'No details available'; // Limit to 1024 characters
    const patchContent = patchNote.content || 'Patch content unavailable';

    // First attempt: create the detailed embed message
    const embed = new EmbedBuilder()
      .setTitle(`New Patch Update for ${game.name}`)
      .setColor('#0099ff')
      .setDescription(patchContent)
      .addFields(
        { name: 'Title', value: title, inline: false },
        { name: 'Release Date', value: releaseDate, inline: true },
        { name: 'Patch Details', value: patchDetails, inline: false }
      )
      .setURL(patchNote.link)
      .setFooter({ text: `Game: ${game.name}` })
      .setTimestamp();

    // Log the embed fields for debugging
    console.log("Embed Fields:", embed.toJSON().fields);

    // Send to each server that follows this game
    for (const follower of followers) {
      const serverId = follower.serverId;
      const guild = trackerBot.guilds.cache.get(serverId);

      if (!guild) {
        console.error(`Bot is not in the server with ID: ${serverId}`);
        await Follow.deleteOne({ serverId });
        console.log(`Server with ID ${serverId} has been removed from the follow list.`);
        continue;
      }

      const defaultChannel = guild.systemChannel || guild.channels.cache.find(ch => ch.type === 'GUILD_TEXT');
      if (!defaultChannel) {
        console.error(`No appropriate text channel found in server: ${guild.name}`);
        continue;
      }

      try {
        // Attempt to send the detailed embed
        console.log(`Attempting to send patch to server: ${guild.name} in channel: ${defaultChannel.name}`);
        await defaultChannel.send({ embeds: [embed] });
        console.log(`Patch for game "${game.name}" sent to server: ${guild.name}`);
      } catch (error) {
        console.error(`Error sending detailed embed to server: ${guild.name}`, error.message);

        // If the detailed embed fails, create a simpler embed
        const simpleEmbed = new EmbedBuilder()
          .setTitle(`Patch for ${game.name}`)
          .setColor('#ff6347') // Different color to distinguish the fallback embed
          .addFields(
            { name: 'Release Date', value: releaseDate, inline: true },
            { name: 'Link to Patch', value: `[Read more](${patchNote.link})`, inline: false }
          )
          .setTimestamp();

        // Send the simpler embed
        console.log(`Sending simple embed to server: ${guild.name}`);
        await defaultChannel.send({ embeds: [simpleEmbed] });
        console.log(`Simple embed for game "${game.name}" sent to server: ${guild.name}`);
      }
    }
  } catch (error) {
    console.error('Error sending patch to Discord:', {
      message: error.message,
      stack: error.stack,
      code: error.code || 'No error code available',
      data: error.response ? error.response.data : 'No response data available',
    });
  }
};



