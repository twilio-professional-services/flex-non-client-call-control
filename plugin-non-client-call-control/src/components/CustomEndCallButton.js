import React from 'react';
import {
  Actions,
  IconButton,
  TaskHelper,
  withTheme,
  templates,
  ContentFragment,
} from '@twilio/flex-ui';
import ConferenceService from '../services/ConferenceService';
import FlexState from '../states/FlexState';

class CustomEndCallButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }
  handleClick = async () => {
    console.debug('*** Custom End Call button clicked');
    const { task, manager } = this.props;

    //await ConferenceService.cancelTask(task.taskSid);
    const workerParticipant = FlexState.getLocalParticipantForTask(task);
    const { callSid: participantCallSid } = workerParticipant;
    if (this.state.disabled === false) {
      this.setState({ disabled: true });
      const removeResults = await ConferenceService.removeParticipant(
        task?.conference?.conferenceSid,
        participantCallSid
      );
      console.debug('REMOVE RESULTS: ', removeResults);
    }
  };
  render() {
    const { task, theme } = this.props;
    const icon =
      !!task.conference && task.conference.liveParticipantCount > 2
        ? 'LeaveCall'
        : 'Hangup';
    return (
      <ContentFragment>
        <IconButton
          className="Twilio-OutboundCall-Cancel"
          icon={icon}
          themeOverride={theme.ConnectingOutboundCallCanvas.CancelCallButton}
          onClick={this.handleClick}
          title={templates.HangupCallTooltip()}
        />
      </ContentFragment>
    );
  }
}

export default withTheme(CustomEndCallButton);
