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

app.get('/api/game/:appid', function (req, res) {
    var appid = req.params.appid;

    if (!/^[0-9]+$/.test(appid)) {
        res.status(400).json({ error: 'App ID must be a number'});
    
    return;
    }

    var storeUrl = 'https://store.steampowered.com/api/appdetails?appids=' + appid;

    fetch(storeUrl)
    .then(function (storeResponse) {
        return storeResponse.json();
    })
    .then(function (data){
        var entry = data[appid];

        if (entry && entry.success) {
            var info = entry.data;
            res.json({
                name: info.name,
                short_description: info.short_description,
                genres: info.genres,
                header_image: info.header_image,
                release_date: info.release_date
            });
        } else {
            res.status(404).json({ error: 'No store deatils found for this game'});
        }
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).json({ error: 'Could not reach the Steam store' });
            
        
    });
});

app.listen(PORT, function () {
    console.log('Server running on http://localhost:' + PORT);
});
