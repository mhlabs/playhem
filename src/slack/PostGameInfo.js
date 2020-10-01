const { WebClient } = require('@slack/web-api');
const token = process.env.SlackToken;
const channel = process.env.SlackChannel;
const web = new WebClient(token);

exports.handler = async (event) => {
    console.log(event)

    /*
    Input data format:
        {
            Player2: { Score: '21', Name: 'lars' },
            Player1: { Score: '6', Name: 'raywon.kari' }
        }
    */

    if (parseInt(event.Player2.Score) > parseInt(event.Player1.Score)) {
        // postMessage(winner, loser) => Player 2 wins!
        await postMessage(event.Player2, event.Player1)
    } else {
        await postMessage(event.Player1, event.Player2)
    }
}

async function postMessage(winner, loser) {
    let slackBlocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "*New Match Recorded!*\n"
            }
        },
        {
            "type": "section",
            "fields": [
                {
                    "type": "mrkdwn",
                    "text": `*${winner.Name}* (Winner :sunglasses:)\nScore: ${winner.Score}`
                },
                {
                    "type": "mrkdwn",
                    "text": `*${loser.Name}* (Loser :imp:)\nScore: ${loser.Score}`
                }
            ]
        }
    ]

    await web.chat.postMessage({
        channel: channel,
        blocks: slackBlocks
    })
}