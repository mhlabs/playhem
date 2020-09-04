const { Entity } = require('dynamodb-toolbox');
const { PlayhemTable } = require('../Table');

const Auth = new Entity({
  name: 'Auth',

  attributes: {
    Username: { partitionKey: true, prefix: "PLAYER#" },
    SK: { hidden: true, sortKey: true },    
    Data: { type: 'map' }, 
    ItemType: ['SK', 0]
    },

  table: PlayhemTable
});

module.exports = {
    Auth
}