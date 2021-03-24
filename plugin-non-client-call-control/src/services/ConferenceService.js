class ConferenceService {
  static baseServerlessUrl = `https://${process.env.REACT_APP_SERVERLESS_BASE_DOMAIN}`;

  static removeParticipant = async (conferenceSid, participantCallSid) => {
    const fetchUrl = `${this.baseServerlessUrl}/conference/remove-participant`;
    const fetchBody = {
      conferenceSid,
      participantCallSid,
    };
    const fetchResponse = await fetch(fetchUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      method: 'POST',
      body: new URLSearchParams(fetchBody),
    });
    let response;
    try {
      response = fetchResponse && (await fetchResponse.json());
    } catch (error) {
      console.error(
        'Unable to parse remove participant response to JSON.',
        error
      );
    }
    console.debug('*** Conference participant remove response:', response);
  };

  static updateParticipant = async (
    conferenceSid,
    participantCallSid,
    updateProperties
  ) => {
    const fetchUrl = `${this.baseServerlessUrl}/conference/update-participant`;
    const fetchBody = {
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
