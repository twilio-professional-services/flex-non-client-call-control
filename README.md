# Flex Non-Twilio Client Worker Endpoint Call Control

## Overview

At the time of this repository's creation, when a TaskRouter worker's "contact_uri" attribute is anything other than a Twilio Client address, the native Flex UI buttons to end the call or put the worker on mute would not work. Clicking Hang Up would move the task to wrapping but the call itself would stay active. The Mute button was disabled. Those functions had to be handled at the worker's device itself and not through the Flex UI.

This repository contains a Flex plugin and Twilio Functions to enable these UI functions for workers not using a Twilio Client for audio. Once these functions are supported natively for non-Twilio Client worker audio endpoints, this customization will no longer be necessary.

## Deployment

### Serverless Functions

#### Prerequisites

If you don't already have the Twilio CLI tools installed, follow this Quickstart guide to install them on your machine.

https://www.twilio.com/docs/twilio-cli/quickstart

Once that's done, follow the instructions here to install the Serverless Toolkit plugin for Twilio CLI.

https://www.twilio.com/docs/labs/serverless-toolkit/getting-started#install-the-twilio-serverless-toolkit

#### Instructions

1. From a terminal, navigate to the `serverless-non-client-call-control` folder in this repository
1. Run `npm i` to install all node.js package dependencies
1. Rename `.env.sample` to `.env` and update the environment variables with values for the Twilio Flex account you'll be deploying these functions to
    1. `ACCOUNT_SID` and `AUTH_TOKEN` are only needed for running the Function locally in your development environment
    1. For `WORKSPACE_SID`, navigate to TaskRouter Workspaces in your Twilio Console to get the SID of your Flex workspace (https://www.twilio.com/console/taskrouter/workspaces)
1. From your terminal again, run `twilio serverless:deploy` to deploy the functions to your Twilio Flex project
    1. Feel free to leverage that commands options such as `--environment` if you'd like to modify the deployment properties
1. Once the deployment is completed, copy the `Domain` in the Deployment Details shown in the terminal. This will be used in the Flex Plugin portion of these instructions.

### Flex Plugin

#### Prerequisites

If you've followed the steps to deploy the Serverless Functions above, then you'll have everything you need to deploy the Flex plugin. If you haven't, please go through deploying the Functions first as that's a dependency for using the Flex plugin.

#### Instructions

1. Navigate to the `plugin-non-client-call-control` folder in this repository
1. Rename `.env.sample` to `.env`
1. Edit `.env` and set the value of `REACT_APP_SERVERLESS_BASE_DOMAIN` to the Serverless Domain Name you copied from the Serverless Function deployment steps above
1. Navigate to the `public` folder of the plugin
1. Rename the `appConfig.sample.js` file to `appConfig.js`
1. Edit `public/appConfig.js` and replace the `accountSid` variable value with your Twilio Flex account's Account SID
1. From a terminal, navigate to the `plugin-non-client-call-control` folder
1. Run `npm i` to install all node.js package dependencies
1. When finished, run `npm run deploy` to deploy the plugin to your Flex account

## Testing

### TaskRouter Worker Setting

1. In the [Twilio Console](twilio.com/console), navigate to `TaskRouter -> {Your Flex Workspace} -> Workers` and select the worker you will be testing with
1. Update the Worker attribute `contact_uri` with an E.164 formatted number, like `+15551234567`

### Flex UI

1. Place a call to a Twilio phone number that's configured to route to Flex
1. Set your Flex user to Available and accept the task
1. That should generate a call to the phone number configured as your worker's `contact_uri`
1. Answer the call on the device that phone number routes to
1. Test the `Mute` button and verify the caller is not able to hear the worker
1. Test the `Hangup` buttons and verify both the call to the worker's device and the original inbound call disconnects

## Disclaimer
This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.
