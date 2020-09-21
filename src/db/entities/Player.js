const { Entity } = require('dynamodb-toolbox');
const { PlayhemTable } = require('../Table');

const type = "PLAYER"
const Player = new Entity({
  name: type,

  attributes: {
    Username: { partitionKey: true, prefix: `${type}#` },
    SK: { hidden: true, sortKey: true },
    Data: {type: "map"},
    ItemType: ['SK', 0], 
    Item: ['SK', 1, { required: false, default: "" }]
  },

  table: PlayhemTable
});

module.exports = {
    Player
}