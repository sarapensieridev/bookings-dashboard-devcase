// Express server to expose Lambda

const express = require("express");
const cors = require("cors");
const { getBookings } = require("./lambda");

const app = express();

app.use(cors());

app.get("/getBookings", async (req, res) => {
  const event = { queryStringParameters: req.query };

  const result = await getBookings(event);
  res.status(result.statusCode).json(JSON.parse(result.body));
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
