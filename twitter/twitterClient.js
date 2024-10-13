import { TwitterApi } from 'twitter-api-v2';
import * as dotenv from 'dotenv'; // Load dotenv at the top
dotenv.config();

export const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export const rwClient = twitterClient.readWrite;


export const postPatchToTwitter = async (game, patchNote) => {
    try {
      let tweetText = `New Patch for *${game.name}*!\n\n`;
  
      if (patchNote.title) {
        tweetText += `**Title:** ${patchNote.title}\n`;
      }
  
      if (patchNote.releaseDate) {
        tweetText += `**Released on:** ${new Date(patchNote.releaseDate).toLocaleDateString()}\n`;
      }
  
      if (patchNote.sections.length > 0 && patchNote.sections[0]?.bullets?.length > 0) {
        tweetText += `**Details:**\n- ${patchNote.sections[0].bullets.join('\n- ')}\n`;
      }
  
      if (patchNote.link) {
        tweetText += `[More info here](${patchNote.link})`;
      }
  
      if (tweetText.length > 280) {
        tweetText = tweetText.slice(0, 277) + '...'; 
      }
  
      const { data } = await rwClient.v2.tweet(tweetText);
      console.log('Tweet successfully posted:', data);
    } catch (error) {
      console.error('Error posting tweet:', error);
    }
};
