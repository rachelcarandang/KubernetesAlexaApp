'use strict';

const request = require('request');
const Twilio = require('twilio');
const HttpResponse = require('./../common/HttpResponse');


module.exports.notifyPhone = (event, context) => {

  console.log(`Notify Endpoint Hit`);
  const notifier = new Notifier();

  console.log(`Calling phone number`);
  // TODO: remove
  context.succeed("");
  // notifier.callPhoneNumber()
  //   .then(response => context.succeed(new HttpResponse.OK(response)))
  //   .catch(error => context.succeed(new HttpResponse.BadRequest(error)));

  // const requestBody = JSON.parse(event.body);
};

module.exports.notifySlack = (event, context) => {

  console.log(`Notify Endpoint Hit`);
  const notifier = new Notifier();

  console.log(`Sending slack request`);
  notifier.sendSlackNotification()
    .then(response => context.succeed(new HttpResponse.OK(response)))
    .catch(error => context.succeed(new HttpResponse.BadRequest(error)));
};

function Notifier() {
  this.slackEndpoint = 'https://hooks.slack.com/services/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';

  this.slackNotificationText = "Urgent: A pod for your Application has gone down. @CTOAdam has responded by adding a pod. Good luck!";

  this.twilioAccountSid = 'ACf462775f5b8046e929b2940a9bf3e486';
  this.twilioAuthToken = 'b33ea767d56c11a7ecb39786e9cbeda2';

  this.toPhoneNumber = "6094807422";
  this.fromPhoneNumber = "2159774815";
}

/**
 @param token String
 */
Notifier.prototype.sendSlackNotification= function () {
  const slackPayload = { text: this.slackNotificationText };

  const requestContent = this.createPostRequest(this.slackEndpoint, slackPayload);

  return new Promise((resolve, reject) => {
    request(requestContent, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        console.log('Success sending slack request!');
        resolve(body);
      }
    });
  });
};

Notifier.prototype.callPhoneNumber = function() {
  return new Promise((resolve, reject) => {
    const client = new Twilio(this.twilioAccountSid, this.twilioAuthToken);

    client.api.calls
      .create({
        url: 'https://demo.twilio.com/welcome/voice/',
        to: `+1${this.toPhoneNumber}`,
        from: `+1${this.fromPhoneNumber}`,
      })
      .then(call => {
        console.log('Success calling phone number!');
        resolve(call);
      })
      .catch(error => reject(error));
  });
};

Notifier.prototype.createPostRequest = function (endpoint, payload) {
  const headers = {
    'Content-Type': 'application/json',
  };

  return {
    headers,
    method: 'POST',
    uri: endpoint,
    json: payload,
  };
};

