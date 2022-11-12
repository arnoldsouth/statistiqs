const express = require("express");
const cors = require("cors");
const axios = require("axios");

// Allows use of environment variables at .env file
require("dotenv").config();

const app = express();

const port = process.env.SERVER_PORT;

// Use CORS
app.use(cors());

// Allows app to parse JSON
app.use(express.json());

// Services

app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
