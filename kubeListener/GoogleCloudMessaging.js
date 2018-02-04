'use strict';

const request = require('request');

const GLOBAL_TOKEN = 'eYd5l8ZC9FU:APA91bGSI4LO8rIL9P2JseV95Gth-wWtGgszgYuOlecl9Wvs8ZT11NWmiy-lu0NlhqRjm5qlTIEfekkglfG_MB7iGCAlOblNTsBXSIB0BoYps88Z3ZQR14eVWHtffXYiqMoAuwgP2rib';
const AUDIO_URL = 'http://soundbible.com/grab.php?id=2192&type=mp3';
function GoogleCloudMessaging(options) {
  this.sendNotificationEndpoint =
    'https://gcm-http.googleapis.com/gcm/send';
  this.senderKey = 'AAAArDoRpiU:APA91bEg0P_ULNIH3OC-LT-2gGY5OrPbuvut9eaCDUjNtygDF3iF9PJxlmvWAAukEFtnflJHAOd5B5fmOiSC31L3hBbgwJctL1n9DVXHsUfJQ7kFPbJyqz38x2MPmgntr3WlV2z6zCI3';
  this.token = options && options.token;
}

GoogleCloudMessaging.prototype.sendNotificationToDevice =
  function sendNotificationToDevice() {
    console.log('Sending notification to device through Google Cloud Messaging...');

    return this._send(AUDIO_URL);
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