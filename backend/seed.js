// Creating DynamoDB table and inserting fake data

const AWS = require("aws-sdk");
const fs = require("fs");

require("dotenv").config();

const dynamodb = new AWS.DynamoDB({
  endpoint: process.env.DDB_ENDPOINT,
  region: "local"
});

const bookings = JSON.parse(fs.readFileSync("./data/bookings.json"));
const guests = JSON.parse(fs.readFileSync("./data/guests.json"));

async function createTables() {
  await dynamodb.createTable({
    TableName: process.env.BOOKINGS_TABLE,
    KeySchema: [{ AttributeName: "bookingId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "bookingId", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST"
  }).promise();

  await dynamodb.createTable({
    TableName: process.env.GUESTS_TABLE,
    KeySchema: [{ AttributeName: "guestId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "guestId", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST"
  }).promise();
}

async function seed() {
  console.log("Creating tables...");
  try {
    await createTables();
  } catch (e) {
    console.log("Tables may already exist");
  }

  console.log("Inserting data...");
  const doc = new AWS.DynamoDB.DocumentClient({ endpoint: process.env.DDB_ENDPOINT, region: "local" });

  for (const b of bookings) {
    await doc.put({ TableName: process.env.BOOKINGS_TABLE, Item: b }).promise();
  }

  for (const g of guests) {
    await doc.put({ TableName: process.env.GUESTS_TABLE, Item: g }).promise();
  }

  console.log("Done!");
}

seed();
