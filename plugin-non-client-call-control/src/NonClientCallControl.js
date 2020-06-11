import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import './listeners/CustomListeners';
import './states/FlexState';
import FlexState from './states/FlexState';
import CustomMuteButton from './components/CustomMuteButton';

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
    const shouldModifyMuteButton = () => {
      return !FlexState.isWorkerUsingWebRTC();
    }

    flex.CallCanvasActions.Content.remove('toggleMute',
      { if: shouldModifyMuteButton }
    );

    flex.CallCanvasActions.Content.add(
      <CustomMuteButton key="custom-mute-button" />,
      {
        sortOrder: -1,
        if: shouldModifyMuteButton
      }
    );
  }
}
