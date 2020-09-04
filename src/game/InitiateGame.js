const { WebClient } = require('@slack/web-api');
const token = process.env.SlackToken;
const web = new WebClient(token);

const { Player } = require('../db/entities/Player');
exports.handler = async function (event, context) {
  const players = await Player.query('player', { index: 'ReverseLookupGSI' });
  console.log(players);
  
  const scores = [];
  for (let i = 0; i <= 100; i++) {
    scores.push(i);
  }

  await web.chat.postEphemeral({
    channel: '#' + event.Channel,
    user: event.UserId,
    text: 'Submit your scores!',
    blocks: [
      {
        type: 'actions',
        elements: [
          {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select player 1',
              emoji: true
            },
            options: players.Items.map((p) => {
              return {
                text: { type: 'plain_text', text: p.Username },
                value: p.Username
              };
            })
          },
          {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select player 2',
              emoji: true
            },
            options: players.Items.map((p) => {
              return {
                text: { type: 'plain_text', text: p.Username },
                value: p.Username
              };
            })
          },
          {
            type: 'divider'
          },
          {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Player 1 score',
              emoji: true
            },            
            options: scores.map((p) => {
              return {
                text: { type: 'plain_text', text: p },
                value: p
              };
            })
          },
          {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Player 2 score',
              emoji: true
            },
            options: scores.map((p) => {
              return {
                text: { type: 'plain_text', text: p },
                value: p
              };
            })
          }
        ]
      }
    ],
    attachments: []
  });

  return event;
};
