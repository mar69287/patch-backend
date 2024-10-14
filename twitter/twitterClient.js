import { TwitterApi } from 'twitter-api-v2';
import * as dotenv from 'dotenv'; // Load dotenv at the top
import axios from 'axios'; // Import axios to fetch the image
dotenv.config();

export const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export const rwClient = twitterClient.readWrite;

// Function to upload an image and return the media ID
const uploadImage = async (imageUrl) => {
  try {
    // Fetch the image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(response.data, 'binary');

    // Upload the image to Twitter
    const mediaId = await rwClient.v1.uploadMedia(imageData, { mimeType: 'image/jpeg' });
    return mediaId;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export const postPatchToTwitter = async (game, patchNote) => {
  try {
    let tweetText = `New Patch for *${game.name}*!\n\n`;

    const encodedLink = encodeURI(patchNote.link);
    console.log("Original Link:", patchNote.link);
    console.log("Encoded Link:", encodedLink);

    if (patchNote.title) {
      tweetText += `Title: ${patchNote.title}\n`;
    }

    if (patchNote.releaseDate) {
      tweetText += `Released on: ${new Date(patchNote.releaseDate).toLocaleDateString()}\n`;
    }

    if (patchNote.link) {
      tweetText += `Here: ${encodedLink}`;
    }

    if (patchNote.sections.length > 0 && patchNote.sections[0]?.bullets?.length > 0) {
      tweetText += `Details:\n- ${patchNote.sections[0].bullets.join('\n- ')}\n`;
    }


    if (tweetText.length > 280) {
      tweetText = tweetText.slice(0, 277) + '...';
    }

    // Upload the game's background image if available
    let mediaId = null;
    if (game.background_image) {
      mediaId = await uploadImage(game.background_image);
    }

    // Prepare tweet parameters
    const tweetParams = { text: tweetText };
    if (mediaId) {
      tweetParams.media = { media_ids: [mediaId] };
    }

    // Post the tweet with optional image
    const { data } = await rwClient.v2.tweet(tweetParams);
    console.log('Tweet successfully posted:', data);
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
};
