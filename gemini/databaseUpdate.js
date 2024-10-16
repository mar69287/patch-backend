import { queryGemini } from './geminiClient.js';
import Game from '../models/game.js';

const formatPatchNotes = (geminiResponse) => {
    const firstSentenceMatch = geminiResponse.match(/^(.*?\.\s)/);
    const firstSentence = firstSentenceMatch ? firstSentenceMatch[0] : geminiResponse;
  
    const sections = [];
    const sectionMatches = geminiResponse.match(/\*\*(.*?)\*\*\n([\s\S]*?)(?=\n\*\*|$)/g);
  
    if (sectionMatches) {
      sectionMatches.forEach(section => {
        const header = section.match(/\*\*(.*?)\*\*/)[1];
        const bullets = section.match(/\*\s(.*?)(?=\n|$)/g);
  
        const formattedBullets = bullets ? bullets.map(bullet => bullet.replace(/^\*\s/, '')) : [];
  
        sections.push({
          subtitle: header,
          bullets: formattedBullets,
        });
      });
    }
  
    return {
      summary: firstSentence,
      sections: sections,
    };
};

export const updatePatchDetails = async (game, patchNote) => {
    try {
        const geminiResponse = await queryGemini(patchNote.link, patchNote.title);
        const formattedPatchNotes = formatPatchNotes(geminiResponse);

        const dbGame = await Game.findOne({ _id: game._id });

        if (!dbGame) {
            console.error('Game not found in the database.');
            return;
        }

        const patchToUpdate = dbGame.patchNotes.find(patch => patch.title === patchNote.title);

        if (!patchToUpdate) {
            console.error(`Patch not found for game: ${game.name}, patch: ${patchNote.title}`);
            return;
        }

        // Update the patch's summary and sections
        patchToUpdate.summary = formattedPatchNotes.summary;
        patchToUpdate.sections = formattedPatchNotes.sections;

        await dbGame.save();
        console.log(`Updated summary and sections for patch: ${patchNote.title}`);
    } catch (error) {
        console.error('Error updating patch:', error);
    }
};
