const AWS = require('aws-sdk');
const querystring = require('querystring');
const eventBridge = new AWS.EventBridge();

exports.handler = async function (event, context) {
  console.log(event);
  let buff = Buffer.from(event.body, 'base64');
  let body = buff.toString('ascii');
  const bodyJson = querystring.parse(body);
  event.body = bodyJson;
  console.log(bodyJson);
  await eventBridge
    .putEvents({
      Entries: [
        {
          EventBusName: process.env.EventBusName,
          Source: 'playhem',
          DetailType: bodyJson.text,
          Detail: JSON.stringify(bodyJson)
        }
      ]
    })
    .promise();
    return {
      statusCode: 200
    }
};
