var Alexa = require('alexa-app')
var request = require('request');

var app = new Alexa.app('app') // eslint-disable-line

app.launch(function (request, response) {
  var launchOutput = 'Welcome to Your Skill.  The purpose of this skill is...  To start using the skill, say Alexa, ask ....'
  response.say(launchOutput)
  response.shouldEndSession(false)
})

app.intent('AMAZON.HelpIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var helpOutput = 'Welcome to Your Skill.  The purpose of this skill is...  To start using the skill, say Alexa, ask .... What would you like to do?'
  response.say(helpOutput)
  response.shouldEndSession(false)
})

app.intent('DoNothingIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var helpOutput = 'Are you sure? I noticed that the last time a pod was deleted on February 3, you responded to this scenario by adding a pod. I recommend you add a pod. Would you like the voice assistant to to add a pod? ';
  response.say(helpOutput);
  response.shouldEndSession(false)
})

app.intent('AddPodIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var helpOutput = 'Excellent choice, I have added a pod.  I couldn’t help noticing that the last time you responded to a fire, you notified lead developer Rachel. Would you like the voice assistant to call Rachel?';
  response.say(helpOutput);
  response.shouldEndSession(false)
})

app.intent('PhoneIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var helpOutput = 'Excellent, I have called Rachel. I couldn’t help noticing that the last time you responded to a fire, you also notified your entire development team with Slack. Would you like the voice assistant to notify the entire team via Slack?';
  response.say(helpOutput);
  response.shouldEndSession(false)
})

app.intent('SlackIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var helpOutput = 'Excellent. I have notified your team of what happened in Slack.';
  response.say(helpOutput);
  response.shouldEndSession(false)
})

app.intent('ThanksIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var helpOutput = 'Anytime! The voice assistant is here to help you with all your dev ops needs. Have a good day!';
  response.say(helpOutput);
  response.shouldEndSession(false)
})

app.intent('AMAZON.StopIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var stopOutput = 'Stopping your Request and Exiting Skill'
  response.say(stopOutput).send()
})

app.intent('AMAZON.CancelIntent', {
  'slots': {},
  'utterances': []
}, function (request, response) {
  var cancelOutput = 'Canceling your Request and Exiting Skill'
  response.say(cancelOutput).send()
})

app.intent('SampleIntent', {
  'slots': {},
  'utterances': ['to say the skill', 'to tell me the name', 'to recite the time']
}, function (request, response) {
  var output = 'Hi there'
  response.say(output).send()
})

module.exports = app
