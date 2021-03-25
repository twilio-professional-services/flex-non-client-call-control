exports.handler = async (context, event, callback) => {
  let response = new Twilio.Response();
  let headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-type': 'application/json',
  };
  response.setHeaders(headers);
  const client = context.getTwilioClient();

  const { conferenceSid, participantCallSid } = event;

  try {
    console.log(
      `Removing participant ${participantCallSid} from conference ${conferenceSid}`
    );
    await client
      .conferences(conferenceSid)
      .participants(participantCallSid)
      .remove();
    console.log('Participant removed');

    const responseBody = {
      success: true,
    };
    response.setBody(responseBody);
    response.setStatusCode(200);

    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
};
