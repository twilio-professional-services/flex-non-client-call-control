import * as Flex from '@twilio/flex-ui';
import FlexState from '../states/FlexState';
import ConferenceService from '../services/ConferenceService';

const hangupNonWebRtcCall = async (task) => {
  const { conference } = task;
  const { conferenceSid, participants } = conference;
  const workerParticipant = participants.find(
    (p) => p.workerSid === FlexState.workerSid
  );

  const { callSid: participantCallSid } = workerParticipant;
  console.debug('ACTIVATE HANGUP NON WEB RTC CALL');
  await ConferenceService.removeParticipant(conferenceSid, participantCallSid);
};

Flex.Actions.addListener('beforeWrapupTask', async (payload, abort) => {
  const { task } = payload;

  if (!task.conferenceSid) {
    return;
  }

  if (FlexState.isWorkerUsingWebRTC()) {
    return;
  }

  if (!Flex.TaskHelper.isCallTask(task)) {
    return;
  }
  await hangupNonWebRtcCall(task);
  abort();
});

Flex.Actions.addListener('beforeHangupCall', async (payload, abort) => {
  const { task } = payload;

  if (!task.conferenceSid) {
    return;
  }

  if (FlexState.isWorkerUsingWebRTC()) {
    return;
  }

  if (!Flex.TaskHelper.isCallTask(task)) {
    return;
  }
  await hangupNonWebRtcCall(task);
  abort();
});
