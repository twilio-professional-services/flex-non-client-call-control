import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import './listeners/CustomListeners';
import './states/FlexState';
import FlexState from './states/FlexState';
import CustomMuteButton from './components/CustomMuteButton';
import CustomEndCallButton from './components/CustomEndCallButton';
import CustomEndCallTaskButton from './components/CustomEndCallTaskButton';

const PLUGIN_NAME = 'NonClientCallControl';

export default class NonClientCallControl extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    const shouldModifyCallCanvas = (props) => {
      return (
        !FlexState.isWorkerUsingWebRTC() &&
        FlexState.getLocalParticipantForTask(props.task)
      );
    };

    flex.CallCanvasActions.Content.remove('toggleMute', {
      if: shouldModifyCallCanvas,
    });

    flex.CallCanvasActions.Content.add(
      <CustomMuteButton key="custom-mute-button" />,
      {
        sortOrder: -1,
        if: shouldModifyCallCanvas,
      }
    );

    flex.ConnectingOutboundCallCanvas.Content.add(
      <CustomEndCallButton key="custom-endcall-button" />,
      { if: shouldModifyCallCanvas }
    );

    flex.TaskListButtons.Content.add(
      <CustomEndCallButton key="custom-endcall-task-button" />,
      { if: shouldModifyCallCanvas }
    );
  }
}
