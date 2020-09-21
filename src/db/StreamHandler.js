const eventsClient = require('@mhlabs/events-client').client;
const client = new eventsClient.Client({
  eventBusName: process.env.EventBusName,
  source: 'playhem'
});

// Put all events on EventBridge. Use PK#SK item types as detail-type
exports.handler = async function (event) {
  const keys = event.Records[0].dynamodb.Keys;  
  const detailType = `${keys.PK.S.split("#")[0]}#${keys.SK.S.split("#")[0]}`
    await client.send(detailType, event);
};
