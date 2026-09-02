var express = require('express');
require('dotenv').config();

var app = express();
app.use(express.static('public'));
var PORT = 3000;

var STEAM_API_KEY = process.env.STEAM_API_KEY;
var STEAM_ID = process.env.STEAM_ID;


app.get('/api/games', function (req, res) {
    var steamUrl = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + STEAM_API_KEY + '&steamid=' + STEAM_ID + '&format=json&include_appinfo=true';

    fetch(steamUrl)
        .then(function (steamResponse) {
            return steamResponse.json();
        })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({ error: 'Could not reach Steam'})
        });
        
    
});

app.listen(PORT, function () {
    console.log('Server running on http://localhost:' + PORT);
});
