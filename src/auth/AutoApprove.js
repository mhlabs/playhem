exports.handler = async function (event, context) {
  event.response.autoConfirmUser = true;
  return event;
};
