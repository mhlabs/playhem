const AWS = require('aws-sdk');
const { Table } = require('dynamodb-toolbox');
const DocumentClient = new AWS.DynamoDB.DocumentClient();

const PlayhemTable = new Table({
  name: process.env.Table,

  partitionKey: 'PK',
  sortKey: 'SK',
  indexes: {
    ReverseLookupGSI: { partitionKey: 'SK', sortKey: 'PK' }
  },

  DocumentClient
});

module.exports = {
  PlayhemTable
};
