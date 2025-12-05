// Dynamo local connector

const AWS = require('aws-sdk');
require('dotenv').config();

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'local',
  endpoint: process.env.DDB_ENDPOINT
});

module.exports = dynamo;