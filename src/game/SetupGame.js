const { WebClient } = require('@slack/web-api');
const token = process.env.SlackToken;
const web = new WebClient(token);

const { Player } = require('../db/entities/Player');
const { Game } = require('../db/entities/Game');
exports.handler = async function (event, context) {
  const idSplit = event.GameId.split('_');
  const item = { Id: idSplit[1], Player: 'setup' };
  item[event.ActionId] = event.Value;
  await Game.put(item);
  return event;
};
