import Game from '../models/game.js';
import Genre from '../models/genre.js';
import Platform from '../models/platform.js';

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

        // try {
        //     const games = await Game.find();
    
        //     const genres = await Genre.find();
    
        //     res.status(200).json({ games, genres });
        // } catch (error) {
        //     console.error('Error fetching games and genres from the database:', error.message);
        //     res.status(500).json({ error: 'Failed to fetch games and genres from the database' });
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