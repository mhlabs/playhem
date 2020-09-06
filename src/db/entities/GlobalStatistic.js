const { Entity } = require('dynamodb-toolbox');
const { PlayhemTable } = require('../Table');

const GlobalStatistic = new Entity({
  name: GlobalStatistic.name,

  attributes: {
    PK: { partitionKey: true, prefix: 'STATISTIC#' },
    SK: { hidden: true, sortKey: true },
    Data: { type: 'map' },
    ItemType: ['SK', 0]
  },

  table: PlayhemTable
});

module.exports = {
  GlobalStatistic
};
