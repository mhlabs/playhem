const { Entity } = require('dynamodb-toolbox');
const { PlayhemTable } = require('../Table');

const Game = new Entity({
  name: 'Game',

  attributes: {
    Id: { partitionKey: true, prefix: 'GAME#' },
    SK: { hidden: true, sortKey: true },
    Score: { map: 'data' },
    Player: ['SK', 0]
  },

  table: PlayhemTable
});

module.exports = {
  Game
};
