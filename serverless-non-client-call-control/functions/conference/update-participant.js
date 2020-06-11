const Twilio = require('twilio');

exports.handler = async function(context, event, callback) {
  let response = new Twilio.Response();
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
  response.setHeaders(headers);

  const {
    ACCOUNT_SID,
    AUTH_TOKEN
  } = context;

  const client = Twilio(ACCOUNT_SID, AUTH_TOKEN);

  const {
    conferenceSid,
    participantCallSid,
    muted
  } = event;

  console.log(`Updating participant ${participantCallSid} in conference ${conferenceSid}`);
  await client.conferences(conferenceSid)
    .participants(participantCallSid)
    .update({
      muted
    });
  console.log('Participant updated');

  const responseBody = {
    success: true
  };
  response.setBody(responseBody);

  callback(null, response);
};
