import axios from 'axios';
import { queryGemini } from '../gemini/geminiClient.js';

export { 
    getPatch, 
};

async function getPatch(req, res) {
    try {
        const { url, title } = req.body; 

        const decodedUrl = decodeURIComponent(url);
        const finalUrl = await resolveFinalUrl(decodedUrl);
        
        const geminiResponse = await queryGemini(finalUrl, title);
        if (!geminiResponse) {
          return res.status(500).json({ message: "Failed to query Gemini" });
        }

        const formattedPatchNotes = formatPatchNotes(geminiResponse);

        const patchNote = {
          summary: formattedPatchNotes.summary || '',
          sections: formattedPatchNotes.sections || [],
          link: finalUrl,
        };

        console.log({patchNote});
        res.status(200).json({patchNote, success: true});
    } catch (error) {
        console.error('Error fetching patch details:', error);
        res.status(500).json({ message: 'Failed to fetch patch details',  success: false });
    }
}

const formatPatchNotes = (geminiResponse) => {
    // Modify the regex to match a period followed by a space or the end of the string
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
                header: header,
                bullets: formattedBullets,
            });
        });
    }
  
    return {
        summary: firstSentence,
        sections: sections,
    };
};
  

const resolveFinalUrl = async (shortUrl) => {
    try {
        const response = await axios.get(shortUrl, { maxRedirects: 5 }); 
        const finalUrl = response.request.res.responseUrl;  
        return finalUrl;
    } catch (error) {
        console.error('Error resolving final URL:', error);
        return shortUrl;
    }
};
