import * as Flex from "@twilio/flex-ui";
import FlexState from "../states/FlexState";
import ConferenceService from "../services/ConferenceService";

const hangupNonWebRtcCall = async (task) => {
  const { conference } = task;
  const { conferenceSid, participants } = conference;
  const workerParticipant = participants.find(
    (p) => p.workerSid === FlexState.workerSid
  );

  const { callSid: participantCallSid } = workerParticipant;

  await ConferenceService.removeParticipant(conferenceSid, participantCallSid);
};

Flex.Actions.addListener("beforeWrapupTask", async (payload, abort) => {
  if (FlexState.isWorkerUsingWebRTC()) {
    return;
  }
  const { task } = payload;
  if (!Flex.TaskHelper.isCallTask(task)) {
    return;
  }
  await hangupNonWebRtcCall(task);
  abort();
});

Flex.Actions.addListener("beforeHangupCall", async (payload, abort) => {
  if (FlexState.isWorkerUsingWebRTC()) {
    return;
  }
  const { task } = payload;
  if (!Flex.TaskHelper.isCallTask(task)) {
    return;
  }
  await hangupNonWebRtcCall(task);
  abort();
});

Flex.Actions.addListener("beforeStopMonitoringCall", async (payload, abort) => {
  if (FlexState.isWorkerUsingWebRTC()) {
    return;
  }
  const { task } = payload;
  if (!Flex.TaskHelper.isCallTask(task)) {
    return;
  }
  console.info("stop monitoring call");
  const conference = task && task.conference;
  const conferenceSid = conference && conference.conferenceSid;
  const myWorkerSid = FlexState.getMyWorkerSid();
  console.log("my worker sid" + myWorkerSid);
  const conferenceChildren = conference?.source?.children || [];
  const supervisorParticipant = conferenceChildren.find(
    (p) =>
      p.value.participant_type === "supervisor" &&
      p.value.status === "joined" &&
      myWorkerSid === p.value.worker_sid
  );
  console.log(`Current supervisorSID = ${supervisorParticipant.key}`);
  const supervisorParticipantSid = supervisorParticipant.key;
  await ConferenceService.removeParticipant(
    conferenceSid,
    supervisorParticipantSid
  );
  abort();
});
