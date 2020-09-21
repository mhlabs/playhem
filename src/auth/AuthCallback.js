const { WebClient } = require('@slack/web-api');
const axios = require('axios');
const qs = require('querystring');
const { Player } = require('../db/entities/Player');

exports.handler = async function (event, context) {
  console.log(event);
  const code = event.queryStringParameters.code;
  const stateSplit = event.queryStringParameters.state.split(',');
  const team = stateSplit[0];
  const userId = stateSplit[1];
  const userName = stateSplit[2];
  const clientId = stateSplit[3];

  const request = {
    grant_type: 'authorization_code',
    code: code,
    client_id: clientId,
    redirect_uri: `https://${event.requestContext.domainName}/oauth2/callback`
  };
  console.log(request, qs.stringify(request));
  const response = await axios({
    method: 'post',
    url: process.env.TokenUrl,
    data: qs.stringify(request),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  await Player.put({
    Username: userName,
    ItemType: 'AUTH',
    Data: response.data
  });

  await Player.put({
    Username: userName,
    ItemType: 'PLAYER',
    Data: { name: userName }
  });

  console.log(response.data);
  return {
    statusCode: 200
  };
};
