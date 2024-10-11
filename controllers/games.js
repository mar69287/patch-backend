import Game from '../models/game.js';
import Genre from '../models/genre.js';
import Platform from '../models/platform.js';
// import axios from 'axios'

export { 
        getGames, 
    };

    async function getGames(req, res) {
        try {
            const games = await Game.find();
            const genres = await Genre.find();
            const platforms = await Platform.find();
    
            res.status(200).json({
                games,
                genres,
                platforms,
            });
        } catch (error) {
            console.error('Error fetching data from MongoDB:', error.message);
            res.status(500).json({ error: 'Failed to fetch data from the database' });
        }
    }
    
    // const rawgApiKey = process.env.RAWG_API_KEY;
    //     const slugs = [
    //         'deep-rock-galactic',
    //         'deep-rock-galactic-survivor',
    //         'destiny-2',
    //         'diablo-iv',
    //         'diablo-3',
    //         'dont-starve-together',
    //         'doom-eternal',
    //         'dota-2',
    //         'dungeonborne',
    //         'ea-sports-fc-24',
    //         'ea-sports-fc-25',
    //         'elden-ring',
    //         'the-elder-scrolls-online',
    //         'enlisted',
    //         'enshrouded-2024',
    //         'euro-truck-simulator-2',
    //         'eve-online',
    //         'factorio',
    //         'fall-guys',
    //         'fallout-76',
    //         'farlight-84',
    //         'farming-simulator-22',
    //         'final-fantasy-14',
    //         'for-honor',
    //         'fornite-battle-royale',
    //         'forza-horizon-5',
    //         'garrys-mod',
    //         'genshin-impact',
    //         'grand-theft-auto-v',
    //         'gray-zone-warfare',
    //         'grounded-2',
    //         'guild-wars-2',
    //         'halls-of-torment',
    //         'halo-the-master-chief-collection',
    //         'hearthstone',
    //         'hearts-of-iron-iv',
    //         'hell-let-loose',
    //         'helldivers-2',
    //         'heroes-of-the-storm',
    //         'honkai-star-rail',
    //         'icarus-4',
    //         'iracing',
    //         'kerbal-space-program-2',
    //         'last-epoch',
    //         'league-of-legends',
    //         'legends-of-runeterra',
    //         'lethal-company',
    //         'lost-ark',
    //         'manor-lords',
    //         'microsoft-flight-simulator',
    //         'minecraft',
    //         'minecraft-bedrock-2',
    //         'minecraft-dungeons',
    //         'minion-masters',
    //         'monster-hunter-rise',
    //         'mordhau',
    //         'mortal-kombat-1-2023',
    //         'mount-blade-ii-bannerlord',
    //         'multiversus',
    //         'naraka-bladepoint',
    //         'new-world-2',
    //         'no-mans-sky',
    //         'old-school-runescape',
    //         'once-human',
    //         'osu',
    //         'overwatch-2',
    //         'paladins',
    //         'palworld',
    //         'path-of-exile',
    //         'payday-2',
    //         'payday-3',
    //         'phasmophobia',
    //         'playerunknowns-battlegrounds',
    //         'raft',
    //         'tom-clancys-rainbow-six-siege-2',
    //         'ready-or-not',
    //         'red-dead-redemption-2',
    //         'rimworld',
    //         'risk-of-rain-2',
    //         'rocket-league',
    //         'runescape',
    //         'old-school-runescape',
    //         'rust',
    //         'satisfactory',
    //         'scum',
    //         'sea-of-thieves',
    //         'skull-bones',
    //         'smite',
    //         'sons-of-the-forest',
    //         'spectre-divide',
    //         'squad',
    //         'star-citizen',
    //         'starcraft-2',
    //         'starfield',
    //         'starship-troopers-extermination',
    //         'stellaris',
    //         'subnautica-below-zero',
    //         'sunkenland',
    //         'team-fortress-2',
    //         'teamfight-tactics',
    //         'tekken-8',
    //         'division-2',
    //         'the-finals',
    //         'the-first-descendant',
    //         'the-great-war-western-front',
    //         'the-isle',
    //         'the-outlast-trials',
    //         'throne-and-liberty',
    //         'total-war-warhammer-iii',
    //         'unturned',
    //         'v-rising',
    //         'valheim',
    //         'valorant',
    //         'vrchat',
    //         'warhammer-vermintide-2',
    //         'war-thunder',
    //         'warframe',
    //         'warhammer-40000-darktide',
    //         'warhammer-40000-space-marine-ii',
    //         'wolcen-lords-of-mayhem',
    //         'world-of-tanks',
    //         'world-of-warcraft',
    //         'world-of-warcraft-classic',
    //         'world-of-warships',
    //         'tom-clancys-xdefiant'
    //     ];

    //     try {
    //         const promises = slugs.map(async (slug) => {
    //             const apiUrl = `https://api.rawg.io/api/games/${slug}?key=${rawgApiKey}`;
                
    //             try {
    //                 const response = await axios.get(apiUrl);
    //                 const gameData = response.data;

    //                 // Create a new game object for MongoDB
    //                 const newGame = new Game({
    //                     name: gameData.name,
    //                     slug: gameData.slug,
    //                     // description: gameData.description || 'No description available',
    //                     background_image: gameData.background_image,
    //                     platforms: gameData.platforms.map(p => p.platform.name),
    //                     genres: gameData.genres.map(g => g.name),
    //                     patchNotes: [], // Empty patch notes for now
    //                 });

    //                 // Save the game to the database
    //                 await newGame.save();
    //                 console.log(`Saved game: ${gameData.name}`);
    //             } catch (error) {
    //                 console.error(`Failed to fetch or save game with slug: ${slug}`, error.message);
    //             }
    //         });

    //         await Promise.all(promises);
    //         res.status(200).json({ message: 'Games fetched and stored successfully.' });
    //     } catch (error) {
    //         console.error('Error fetching or saving games:', error.message);
    //         res.status(500).json({ error: 'Failed to fetch or save games.' });
    //     }

        // try {
        //     const games = await Game.find();
        //     const genres = await Genre.find();
        //     const platforms = await Platform.find();
    
        //     res.status(200).json({
        //         games,
        //         genres,
        //         platforms,
        //     });
        // } catch (error) {
        //     console.error('Error fetching data from MongoDB:', error.message);
        //     res.status(500).json({ error: 'Failed to fetch data from the database' });
        // }

        // this is the code for rawg
        // const rawgApiKey = process.env.RAWG_API_KEY; 
        // const apiUrl = `https://api.rawg.io/api/games?ordering=-rating&page_size=100&key=${rawgApiKey}&tags=multiplayer`;
    
        // try {
        //     const response = await axios.get(apiUrl);
    
        //     res.status(200).json(response.data.results);
        // } catch (error) {
        //     console.error('Error fetching data from RAWG API:', error.message);
        //     res.status(500).json({ error: 'Failed to fetch data from RAWG API' });
        // }

        // this is the code for igdb
        // const igdbClientId = process.env.IGDB_CLIENT_ID;
        // const igdbAccessToken = process.env.IGDB_ACCESS_TOKEN;
        // const apiUrl = 'https://api.igdb.com/v4/games';
        // try {

        //     const response = await fetch(apiUrl, {
        //         method: 'POST',
        //         headers: {
        //             'Client-ID': igdbClientId,
        //             'Authorization': `Bearer ${igdbAccessToken}`,
        //             'Content-Type': 'application/json'
        //         },
        //         body: `fields id, name, summary, cover.url, websites.url, rating; 
        //                where multiplayer_modes.onlinecoop = true 
        //                | multiplayer_modes.lancoop = true 
        //                | multiplayer_modes.campaigncoop = true 
        //                | multiplayer_modes.offlinecoop = true 
        //                | multiplayer_modes.splitscreen = true 
        //                | multiplayer_modes.splitscreenonline = true 
        //                | multiplayer_modes.dropin = true 
        //                | multiplayer_modes.onlinemax > 1 
        //                | multiplayer_modes.offlinemax > 1; 
        //                sort rating desc; 
        //                limit 100;`
        //     });
    
        //     // Parse the response JSON
        //     const data = await response.json();
    
        //     // Respond with the complete list of games with their fields
        //     res.status(200).json(data);
        // } catch (error) {
        //     console.error('Error fetching data from IGDB API:', error.message);
        //     res.status(500).json({ error: 'Failed to fetch data from IGDB API' });
        // }