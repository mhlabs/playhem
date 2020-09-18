const AWS = require('aws-sdk');
const querystring = require('querystring');
const eventBridge = new AWS.EventBridge();

exports.slash = async function (event, context) {
  console.log(event);
  let buff = Buffer.from(event.body, 'base64');
  let body = buff.toString('ascii');
  const bodyJson = querystring.parse(body);
//  console.log(JSON.stringify(bodyJson, null, 2));
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
  };
};

exports.interact = async function (event, context) {

  let buff = Buffer.from(event.body, 'base64');
  let body = buff.toString('ascii');
  const bodyJson = JSON.parse(querystring.parse(body).payload);
  console.log(bodyJson.view);
  event.body = bodyJson;
  await eventBridge
    .putEvents({
      Entries: [
        {
          EventBusName: process.env.EventBusName,
          Source: 'playhem',
          DetailType: bodyJson.view.callback_id,
          Detail: JSON.stringify(bodyJson)
        }
      ]
    })
    .promise();
  return {
    statusCode: 200
  };
};
