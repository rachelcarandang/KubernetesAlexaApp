'use strict';

const request = require('request');

const GLOBAL_TOKEN = 'd4KY1K5Mhjo:APA91bFnBWYq_TUtBilYJbulaQuKY_1Uw2dm6TpEtNNWguvOB1yGJ28IZeJytVBx4Nreq0Aom2jZmP7RzOKeO7V3mxCzNU4Fxxwi-wlgG7_m0-Vtk60zAJ5hyARNE_406-3tO1_wcWpz';

function GoogleCloudMessaging(options) {
  this.sendNotificationEndpoint =
    'https://gcm-http.googleapis.com/gcm/send';
  this.senderKey = 'AAAArDoRpiU:APA91bEg0P_ULNIH3OC-LT-2gGY5OrPbuvut9eaCDUjNtygDF3iF9PJxlmvWAAukEFtnflJHAOd5B5fmOiSC31L3hBbgwJctL1n9DVXHsUfJQ7kFPbJyqz38x2MPmgntr3WlV2z6zCI3';
  this.token = options && options.token;
}

GoogleCloudMessaging.prototype.sendNotificationToDevice =
  function sendNotificationToDevice() {
    console.log('Sending notification to device through Google Cloud Messaging...');

    return this._send("");
  }

/**
 @param token String
 */
GoogleCloudMessaging.prototype._send =
  function _send(info) {
    const gcmRequest = this._createRequest(info);
    console.log(`Sending`);
    return new Promise((resolve, reject) => {
      request(gcmRequest, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          console.log('Success!');
          resolve(body);
        }
      });
    });
  }


GoogleCloudMessaging.prototype._createRequest =
  function _createRequest(info) {
    const authKey = `key=${this.senderKey}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': authKey,
    };
    return {
      headers,
      method: 'POST',
      uri: this.sendNotificationEndpoint,
      json: {
        data: {
          info,
        },
        to: GLOBAL_TOKEN,
      },
    };
  }

module.exports = GoogleCloudMessaging;