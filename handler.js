'use strict';
const { app } = require("app");
const serverlessHttp = require("serverless-http");

module.exports.handler = serverlessHttp(app);
