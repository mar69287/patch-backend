import Game from '../models/user.js'

export { 
        getGames, 
    };

async function getGames(req, res) {
    console.log('in get all games controller');
    console.log(req.body)
    res.status(200).json([]);
}
