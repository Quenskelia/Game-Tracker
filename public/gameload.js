function loadGames() {
    fetch('/api/games')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var games = data.response.games;

        games.sort(function (a, b) {
            return b.playtime_forever - a.playtime_forever;
        });

        renderGames(games);
      })
        .catch(function (error) {
            console.log(error);
            alert('Could not reach Steam. Please try again!');
        });
}

function renderGames(games) {
    var container = document.getElementById('game-list');
    container.innerHTML = '';

    for (var i = 0; i < games.length; i++) {
        var game = games[i];
        var hours = Math.floor(game.playtime_forever / 60);
        var minutes = game.playtime_forever % 60;

        var gameDiv =  document.createElement('div');
        gameDiv.className = 'game-item';
        gameDiv.textContent = game.name + '-' + hours + 'hrs' + minutes + 'min';

        container.appendChild(gameDiv);
    }

}

loadGames();