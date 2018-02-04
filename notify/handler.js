'use strict';

const request = require('request');
const HttpResponse = require('./../common/HttpResponse');

module.exports.notify = (event, context) => {

  console.log(`Notify Endpoint Hit`);

  const notifier = new Notifier();

  console.log(`Sending slack request`);

  notifier.sendSlackNotification()
    .then(response => context.succeed(new HttpResponse.OK(response)))
    .catch(error => context.succeed(new HttpResponse.BadRequest(error)));


  // const requestBody = JSON.parse(event.body);

  // const deviceToken = requestBody.deviceToken;

  // console.log("notified console log statement");
  // const response = {
  //   message: 'foo!'
  // };
  //
  //
  // context.succeed(new HttpResponse.OK(response));


};

function Notifier() {
  this.slackEndpoint = 'https://hooks.slack.com/services/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';

  this.slackNotificationText = "Urgent: A pod for your Application has gone down. @CTOAdam has sent the following message:"
       + "Just replaced with a new pod via Alexa. Monitor while I come into work.";
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
