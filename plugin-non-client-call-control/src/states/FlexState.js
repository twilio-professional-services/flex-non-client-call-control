import * as Flex from '@twilio/flex-ui';

class FlexState {
  static get manager() {
    return Flex.Manager.getInstance();
  }

  static get workerClient() {
    return this.manager.workerClient;
  }

  static get workerSid() {
    return this.workerClient.sid;
  }

  static isWorkerUsingWebRTC = () => {
    const { attributes } = this.workerClient;
    const { contact_uri } = attributes;
    return contact_uri.startsWith('client:');
  };

  static getLocalParticipantForTask = (task) => {
    const participants = task?.conference?.participants || [];
    const workerParticipant = participants.find(
      (p) => p.workerSid === this.workerSid
    );

    return workerParticipant;
  };
}

export default FlexState;
