'use strict';

const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
};

function HtmlOK(body) {
  this.statusCode = 200;
  this.headers = {
    'Content-Type' : 'text/html'
  };
  this.body = body;
}

function OK(body) {
  this.statusCode = 200;
  this.headers = defaultHeaders;
  this.body = JSON.stringify(body);
}

function BadRequest(error) {
  const errorMessage = `Validation failed with the following error: ${error}`;
  this.statusCode = 400;
  this.headers = defaultHeaders;
  this.body = JSON.stringify({
    message: errorMessage,
  });
}

function InternalServerError(error) {
  this.statusCode = 500;
  this.headers = defaultHeaders;
  this.body = JSON.stringify({
    message: error.message,
    stack: error.stack,
  });
}

// http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html#api-gateway-simple-proxy-for-lambda-output-format
module.exports = {
  OK,
  BadRequest,
  InternalServerError,
  HtmlOK,
};