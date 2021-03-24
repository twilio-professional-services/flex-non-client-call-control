exports.handler = async function (context, event, callback) {
  let response = new Twilio.Response();
  let headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
  response.setHeaders(headers);

  const client = context.getTwilioClient();
  let count = 0;
  const maxTries = 3;
  while (true) {
    try {
      const { conferenceSid, participantCallSid } = event;

      console.log(
        `Removing participant ${participantCallSid} from conference ${conferenceSid}`
      );
      const removeParticipant = await client
        .conferences(conferenceSid)
        .participants(participantCallSid)
        .remove();
      console.log('Participant removed');

      const responseBody = {
        success: true,
      };
      response.setBody(responseBody);

      callback(null, response);
      return;
    } catch (error) {
      console.log('COUNT: ', count);
      if (++count == maxTries) {
        console.error(error);
        throw error;
      }
    }
  }
};
