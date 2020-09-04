const { WebClient } = require('@slack/web-api');
const token = process.env.SlackToken;
const web = new WebClient(token);

exports.handler = async function (event, context) {
  console.log(event);

  await web.chat.postEphemeral({
    channel: '#' + event.Channel,
    user: event.UserId,
    text: 'Hello',
    attachments: [
      {
        text: 'Click below to sign up or sign in',
        fallback: "Buttons aren't supported",
        callback_id: 'signin_buttom',
        color: '#3AA3E3',
        attachment_type: 'default',
        actions: [
          {
            name: 'signin',
            text: 'Sign in/up',
            type: 'button',
            value: 'signin',
            url: `${process.env.UserPoolDomainUrl}/oauth2/authorize?client_id=${process.env.ClientId}&response_type=code&scope=openid&state=${event.Team},${event.UserId},${event.UserName},${process.env.ClientId}&redirect_uri=${process.env.RedirectUri}`
          }
        ]
      }
    ]
  });
};
