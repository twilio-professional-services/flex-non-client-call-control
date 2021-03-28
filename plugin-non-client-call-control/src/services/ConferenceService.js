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
    const updateRequest = await axios.post(url, data);
    let response = JSON.parse(updateRequest.request.response);
    response = response.success;

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
