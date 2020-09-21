const { WebClient } = require('@slack/web-api');
const token = process.env.SlackToken;
const web = new WebClient(token);

const { Player } = require('../db/entities/Player');
const { Game } = require('../db/entities/Game');
exports.handler = async function (event, context) {
  console.log(event);
  await Game.put({
    Id: event.Data.gameId,
    Item: event.Data.event.Player1.Name,
    Data: {
      score: event.Data.event.Player1.Score,
      winner: event.Data.event.Player1.Score > event.Data.event.Player2.Score
    },
    ItemType: 'PLAYER'
  });
  await Game.put({
    Id: event.Data.gameId,
    Item: event.Data.event.Player2.Name,
    Data: {
      score: event.Data.event.Player2.Score,
      winner: event.Data.event.Player2.Score > event.Data.event.Player1.Score
    },
    ItemType: 'PLAYER'
  });
};
