exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();
  const response = new Twilio.Response();
  const responseBody = {
    success: true,
    payload: {
      errors: [],
    },
  };

  const { conferenceSid, participantCallSid } = event;
  try {
    if (!event.participantCallSid) {
      // This handles the case where a specific parameter was not sent
      throw {
        status: 400,
        code: 60200,
        message: 'Request must include a participant call SID',
      };
    }
    console.log(
      `Removing participant ${participantCallSid} from conference ${conferenceSid}`
    );
    await client
      .conferences(conferenceSid)
      .participants(participantCallSid)
      .remove();
    console.log('Participant removed');
  } catch (e) {
    console.error(e.message || e);

    response.setStatusCode(e.status || 500);

    responseBody.success = false;
    responseBody.payload.errors = responseBody.payload.errors || [];
    responseBody.payload.errors.push({
      code: e.code || 500,
      message: e.message,
    });
  }

  response.setBody(responseBody);
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
  response.appendHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, X-Twilio-Signature'
  );

  return callback(null, response);
};
