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

        var kingOfTheHill = games[0];
        var restOfGames = games.slice(1);

        renderKingOfTheHill(kingOfTheHill);
        renderLastPlayed(games);
        renderGames(restOfGames);
      })
        .catch(function (error) {
            console.log(error);
            alert('Could not reach Steam. Please try again!');
        });
}

function renderKingOfTheHill(game) {
  var container = document.getElementById('king-of-the-hill');
  var hours = Math.floor(game.playtime_forever / 60);
  var minutes = game.playtime_forever % 60;

  container.textContent = game.name + ' - ' + hours + 'hrs ' + minutes + 'min';
}

function renderLastPlayed(games) {
  var mostRecentGame = null;
  var mostRecentTimestamp = 0;

  for (var i = 0; i < games.length; i++) {
    if (games[i].rtime_last_played > mostRecentTimestamp) {
      mostRecentTimestamp = games[i].rtime_last_played;
      mostRecentGame = games[i];
    }
  }
  var container = document.getElementById('last-played');
  container.textContent = mostRecentGame.name + '-' + getTimeAgoText(mostRecentTimestamp);
}

function getTimeAgoText(unixTimestamp){
  var now = Math.floor(Date.now() / 1000);
  var secondsAgo = now - unixTimestamp;

  var minutesAgo = Math.floor(secondsAgo / 60);
  var hoursAgo = Math.floor(secondsAgo / 3600);
  var daysAgo = Math.floor(secondsAgo / 86400);

  if (daysAgo >=1) {
      return daysAgo + (daysAgo ===1 ? ' day ago' : ' days ago');
  } else if (hoursAgo >= 1){
      return hoursAgo + (hoursAgo === 1 ? ' hour ago' : ' hours ago');
  } else if (minutesAgo >=1){
      return minutesAgo + (minutesAgo === 1 ? ' minute ago' : ' minutes ago');
  } else {
      return 'just now';
    }
  }
  function renderGames(games){
    var container = document.getElementById('game-list');
    container.innerHTML = '';

    for (var i =0; i < games.length; i++){
      var game = games[i];
      var hours = Math.floor(game.playtime_forever / 60);
      var minutes = game.playtime_forever % 60;

      var gameDiv = document.createElement('div');
      gameDiv.className= 'game-item';
      gameDiv.textContent = game.name + '-' + hours + 'hrs ' + minutes + 'min';

      container.appendChild(gameDiv)
      }
  }

loadGames();