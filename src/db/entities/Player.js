const { Entity } = require('dynamodb-toolbox');
const { PlayhemTable } = require('../Table');

const Player = new Entity({
  name: 'Player',

  attributes: {
    Username: { partitionKey: true, prefix: "PLAYER#" },
    SK: { hidden: true, sortKey: true },
    Name: { map: 'data' }, 
    ItemType: ['SK', 0], 
  },

  table: PlayhemTable
});

module.exports = {
    Player
}