// Simulating Lambda
const dynamo = require('./dynamo');
require('dotenv').config();

exports.getBookings = async (event) => {
  const pageSize = Number(event.queryStringParameters?.pageSize || 50);
  const nextPageToken = event.queryStringParameters?.nextPageToken || null;
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 7);
  const endDate = new Date(now);
  endDate.setDate(now.getDate() + 7);

  console.log(
    `📥 Request received - pageSize: ${pageSize}, hasToken: ${!!nextPageToken}`
  );

  let exclusiveStartKey = null;

  if (nextPageToken) {
    exclusiveStartKey = JSON.parse(
      Buffer.from(nextPageToken, 'base64').toString()
    );
  }

  // Scan with pagination
  const scanParams = {
    TableName: process.env.BOOKINGS_TABLE,
    Limit: pageSize,
    ExclusiveStartKey: exclusiveStartKey,
    FilterExpression: '#checkIn BETWEEN :start AND :end',
    ExpressionAttributeNames: {
      '#checkIn': 'checkIn',
    },
    ExpressionAttributeValues: {
      ':start': startDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
      ':end': endDate.toISOString().split('T')[0],
    },
  };

  const bookingsResult = await dynamo.scan(scanParams).promise();
  let bookings = bookingsResult.Items;

  console.log(`📊 Scanned ${bookings.length} bookings from DynamoDB`);

  // Enrich with guest metadata
  for (let booking of bookings) {
    const guest = await dynamo
      .get({
        TableName: process.env.GUESTS_TABLE,
        Key: { guestId: booking.guestId },
      })
      .promise();
    booking.guest = guest.Item || null;
  }

  // Sort by bookingId
  bookings.sort((a, b) => {
    const numA = parseInt(a.bookingId.replace(/\D/g, '')) || 0;
    const numB = parseInt(b.bookingId.replace(/\D/g, '')) || 0;
    return numA - numB;
  });

  let returnToken = null;

  if (bookingsResult.LastEvaluatedKey) {
    returnToken = Buffer.from(
      JSON.stringify(bookingsResult.LastEvaluatedKey)
    ).toString('base64');
  }

  const responseBody = JSON.stringify({
    bookings,
    nextPageToken: returnToken,
  });

  const payloadSizeKB = (Buffer.byteLength(responseBody) / 1024).toFixed(2);
  console.log(
    `📤 Response - Bookings: ${
      bookings.length
    }, Payload: ${payloadSizeKB} KB, hasMore: ${!!returnToken}`
  );
  console.log(`---`);

  return {
    statusCode: 200,
    body: responseBody,
  };
};
