const { WebClient } = require('@slack/web-api');
const token = process.env.SlackToken;
const web = new WebClient(token);

const { Player } = require('../db/entities/Player');
const { Game } = require('../db/entities/Game');
exports.handler = async function (event, context) {
  const players = await Player.query('PLAYER#', { index: 'ReverseLookupGSI' });
  console.log(players);

  const scores = [];
  for (let i = 0; i <= 30; i++) {
    scores.push(i.toString());
  }
  const gameId = new Date().toISOString();
  console.log(scores);

  const blocks = [
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Player 1*  :table_tennis_paddle_and_ball:"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "block_id": "player1",
      "text": {
        "type": "mrkdwn",
        "text": "Player"
      },
      "accessory": {
        "type": "static_select",
        "action_id": "player1",
        "placeholder": {
          "type": "plain_text",
          "text": "Select player",
          "emoji": true
        },
        "options": players.Items.map((p) => {
          return {
            text: {
              type: 'plain_text',
              text: p.Username
            },
            value: p.Username
          }
        })
      }
    },
    {
      "type": "section",
      "block_id": "score1",
      "text": {
        "type": "mrkdwn",
        "text": "Score"
      },
      "accessory": {
        "type": "static_select",
        "action_id": "score1",
        "placeholder": {
          "type": "plain_text",
          "text": "Select score",
          "emoji": true
        },
        "options": scores.map((p) => {
          return {
            text: {
              type: 'plain_text',
              text: p
            },
            value: p
          }
        })
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Player 2*  :table_tennis_paddle_and_ball:"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "block_id": "player2",
      "text": {
        "type": "mrkdwn",
        "text": "Player"
      },
      "accessory": {
        "type": "static_select",
        "action_id": "player2",
        "placeholder": {
          "type": "plain_text",
          "text": "Select player",
          "emoji": true
        },
        "options": players.Items.map((p) => {
          return {
            text: {
              type: 'plain_text',
              text: p.Username
            },
            value: p.Username
          }
        })
      }
    },
    {
      "type": "section",
      "block_id": "score2",
      "text": {
        "type": "mrkdwn",
        "text": "Score"
      },
      "accessory": {
        "type": "static_select",
        "action_id": "score2",
        "placeholder": {
          "type": "plain_text",
          "text": "Select score",
          "emoji": true
        },
        "options": scores.map((p) => {
          return {
            text: {
              type: 'plain_text',
              text: p
            },
            value: p
          }
        })
      }
    }
  ];

  console.log(event.TriggerId);
  await web.views.open({
    view: {
      callback_id: `submit-game-${gameId}`,
      type: 'modal',
      blocks: blocks,
      title: {
        type: 'plain_text',
        text: 'Record a pingpong game'
      },
      submit: {
        type: 'plain_text',
        text: 'Submit'
      }
    },
    trigger_id: event.TriggerId
  });

  return event;
};
