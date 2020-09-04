const { WebClient } = require('@slack/web-api');
const axios = require('axios');
const qs = require('querystring');
const { Auth } = require("../db/entities/Auth");
const { Player } = require("../db/entities/Player");

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
  
  await Auth.put( {
    Username: userName,
    ItemType: "auth",
    Data: response.data,
  });

  await Player.put( {
    Username: userName,
    ItemType: "player",
  });

  console.log(response.data);
  return {
    statusCode: 200
  };
};
