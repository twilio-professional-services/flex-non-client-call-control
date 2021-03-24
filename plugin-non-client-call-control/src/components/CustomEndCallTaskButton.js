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

class CustomEndCallTaskButton extends React.PureComponent {
  handleClick = async () => {
    console.debug('*** Custom End Call task button clicked');
    const { task } = this.props;
    console.debug('PROPS OBJ: ', this.props);

    //await ConferenceService.cancelTask(task.taskSid);
    const workerParticipant = FlexState.getLocalParticipantForTask(task);
    const { callSid: participantCallSid } = workerParticipant;
    await ConferenceService.removeParticipant(
      task?.conference?.conferenceSid,
      participantCallSid
    );
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
          className="Twilio-TaskButton-Hangup"
          onClick={this.handleClick}
          icon={icon}
          themeOverride={theme.TaskList.Item.Buttons.RejectButton}
          title={templates.HangupCallTooltip()}
        />
      </ContentFragment>
    );
  }
}

export default withTheme(CustomEndCallTaskButton);
