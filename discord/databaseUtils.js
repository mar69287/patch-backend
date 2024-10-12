// Import the trackerBot so you can use it to send messages
import { trackerBot } from './discordClient.js'; 

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

    // After saving the game, send the latest patch to the Discord server
    await sendPatchToDiscord(game, newPatchNote);
    
  } catch (error) {
    console.error('Error saving patch to the database:', error.message);
  }
};

// Function to send the patch note to the Discord server via trackerBot
const sendPatchToDiscord = async (game, patchNote) => {
  try {
    // Customize your message content here, including the title, content, and other patch details
    // const messageContent = `
    //   **New Patch Update for ${game.name}:**
    //   **Title:** ${patchNote.title}
    //   **Release Date:** ${patchNote.releaseDate}
    //   **Details:**
    //   ${patchNote.content}

    //   **Link:** ${patchNote.link}
    //   ${patchNote.sections.length > 0 ? `**Details:** ${patchNote.sections[0].bullets.join('\n- ')}` : ''}
    // `;

    console.log({patchNote})
    console.log({game})
  //   // Get the Discord channel where you want to send the message (You can use the channel ID or name)
  //   const channel = trackerBot.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    
  //   if (channel) {
  //     // Send the message to the channel
  //     await channel.send(messageContent);
  //     console.log(`Patch for game "${game.name}" sent to Discord.`);
  //   } else {
  //     console.error('Discord channel not found.');
  //   }
  } catch (error) {
    console.error('Error sending patch to Discord:', error.message);
  }
};
