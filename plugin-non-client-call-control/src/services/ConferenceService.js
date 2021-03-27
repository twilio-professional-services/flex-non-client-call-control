import axios from 'axios';
class ConferenceService {
  static baseServerlessUrl = `https://${process.env.REACT_APP_SERVERLESS_BASE_DOMAIN}`;
  static removeParticipant = async (conferenceSid, participantCallSid) => {
    const url = `${this.baseServerlessUrl}/conference/remove-participant`;

    const data = {
      conferenceSid,
      participantCallSid,
    };
    const options = {
      method: 'delete',
    };
    const removeRequest = await axios.post(url, data, options);

    let response = JSON.parse(removeRequest.request.response);
    response = response.success;

    return response;
  };

  static updateParticipant = async (
    conferenceSid,
    participantCallSid,
    updateProperties
  ) => {
    const url = `${this.baseServerlessUrl}/conference/update-participant`;
    const data = {
      conferenceSid,
      participantCallSid,
      ...updateProperties,
    };
    const fetchResponse = await fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(fetchBody),
    });
    let response;
    try {
      response = fetchResponse && (await fetchResponse.json());
    } catch (error) {
      console.error(
        'Unable to parse update participant response to JSON.',
        error
      );
    }
    console.debug('*** Conference participant updated:', response);
  };

  static muteParticipant = async (conferenceSid, participantCallSid) => {
    const updateProperties = {
      muted: true,
    };
    await this.updateParticipant(
      conferenceSid,
      participantCallSid,
      updateProperties
    );
  };

  static unMuteParticipant = async (conferenceSid, participantCallSid) => {
    const updateProperties = {
      muted: false,
    };
    await this.updateParticipant(
      conferenceSid,
      participantCallSid,
      updateProperties
    );
  };
}

export default ConferenceService;
