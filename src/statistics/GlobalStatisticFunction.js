const { GlobalStatistic } = require('../db/entities/GlobalStatistic');
const { Game } = require('../db/entities/game');

function activePlayers(players, maxDays = 30) {
  if (!players) {
    throw Error(
      'players parameter was falsy when calling activePlayers(players, maxDays)'
    );
  }

  const today = new Date();
  const activePlayers = [];
  for (const player of players) {
    const lastModified = new Date(player._md);

    if (daysFromDate(lastModified, today) <= maxDays) {
      activePlayers.push(item);
    }
  }

  return activePlayers.length;
}

function daysFromDate(pastDate, today) {
  var differenceInTime = pastDate.getTime() - today.getTime();
  return differenceInTime / (1000 * 3600 * 24);
}

exports.handler = async function (event, context) {
  console.log(event);
  // const gameResponse = await Game.query('game', { index: 'ReverseLookupGSI' });
  const playerResponse = await Game.query('player', {
    index: 'ReverseLookupGSI'
  });
  const authResponse = await Game.query('auth', { index: 'ReverseLookupGSI' });
  const activePlayers = activePlayers(authResponse.Items);

  await GlobalStatistic.put({
    PK: 'global-statistic',
    ItemType: 'global-statistic',
    Data: {
      gamesPlayed: 0, // gameResponse.Count,
      totalPlayers: playerResponse.Count,
      activePlayers
    }
  });
};
