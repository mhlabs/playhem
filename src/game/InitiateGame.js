const { WebClient } = require('@slack/web-api');
const token = process.env.SlackToken;
const web = new WebClient(token);

const { Player } = require('../db/entities/Player');
const { Game } = require('../db/entities/Game');
exports.handler = async function (event, context) {
  const players = await Player.query('player', { index: 'ReverseLookupGSI' });
  console.log(players);

  const scores = [];
  for (let i = 0; i <= 30; i++) {
    scores.push(i.toString());
  }
  const gameId = new Date().toISOString();
  console.log(scores);

  const blocks = [
    {
      type: 'input',
      block_id: `player1`,
      label: {
        type: 'plain_text',
        text: 'Select player 1',
        emoji: true
      },
      element: {
        action_id: 'value',
        type: 'static_select',
        options: players.Items.map((p) => {
          return {
            text: { type: 'plain_text', text: p.Username },
            value: p.Username
          };
        })
      }
    },
    {
      type: 'input',
      block_id: `player2`,
      label: {
        type: 'plain_text',
        text: 'Select player 2',
        emoji: true
      },
      element: {
        action_id: 'value',
        type: 'static_select',
        options: players.Items.map((p) => {
          return {
            text: { type: 'plain_text', text: p.Username },
            value: p.Username
          };
        })
      }
    },
    {
      type: 'input',
      block_id: `score1`,
      label: {
        type: 'plain_text',
        text: 'Select player 1 score',
        emoji: true
      },
      element: {
        action_id: 'value',
        type: 'static_select',
        options: scores.map((p) => {
          return {
            text: { type: 'plain_text', text: p },
            value: p
          };
        })

      }
    },
    {
      type: 'input',
      block_id: `score2`,
      label: {
        type: 'plain_text',
        text: 'Select player 2 score',
        emoji: true
      },
      element: {
        action_id: 'value',
        type: 'static_select',
        options: scores.map((p) => {
          return {
            text: { type: 'plain_text', text: p },
            value: p
          };
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
        text: 'Record your scores'
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
