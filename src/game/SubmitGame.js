const { WebClient } = require('@slack/web-api');
const token = process.env.SlackToken;
const web = new WebClient(token);

const { Player } = require('../db/entities/Player');
const { Game } = require('../db/entities/Game');
exports.handler = async function (event, context) {
  const gameId = new Date().toISOString();
  await Game.put({
    Id: gameId,    
    Data: {gameId, event},
    ItemType: 'SUMMARY'
  });
  console.log(event);
};