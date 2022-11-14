const express = require("express");
const cors = require("cors");
const axios = require("axios");

// Allows use of environment variables at .env file
require("dotenv").config();

const app = express();

const port = process.env.SERVER_PORT;
const apiKey = process.env.RIOT_TOKEN;

// Use CORS
app.use(cors());

// Allows app to parse JSON
app.use(express.json());

// Services
const getPlayerPuuid = (gameName, tagLine) => {
  return axios
    .get(
      "https://na1.api.riotgames.com" +
        "/riot/account/v1/accounts/by-riot-id/" +
        gameName +
        "/" +
        tagLine +
        "?api_key=" +
        apiKey
    )
    .then((response) => {
      console.log(response.data);
      return response.data.puuid;
    })
    .catch((err) => err);
};

app.get("/recentMatches", async (req, res) => {
  // We pass in the parameter req.query.username here which is from our frontend at function getPlayerGames for the get request params
  const gameName = req.query.gamename;
  const tagLine = req.query.tagLine;

  // Puuid
  // Promise needs to get fulfilled so we can use the puuid going forward
  const puuid = await getPlayerPuuid(gameName, tagLine);

  // API call to retrieve Match by Puuid
  const regionCallURL =
    "https://americas.api.riotgames.com" +
    "/match/v1/matchlists/by-puuid/" +
    puuid +
    // "/ids" +
    "?api_key=" +
    apiKey;

  // Get request for regionCallURL: this will give us a list of game IDs
  const gameIds = await axios
    .get(regionCallURL)
    .then((response) => response.data)
    .catch((err) => err);

  // A list of game ID strings (20 games)
  console.log(gameIds);

  // Loop through the game IDs; for each loop, get the information based off game ID (the API CALL)
  // Can use API caching if we have a lot of API calls
  // Declare match data as a new array
  const matchDataArray = [];
  // Each time this loop runs, there's an API call which is taxing
  for (let i = 0; i < gameIds.length - 10; i++) {
    // We declare a match id for whichever ones are given to us
    const matchId = gameIds[i];
    const matchData = await axios
      .get(
        "https://americas.api.riotgames.com" +
          "/match/v1/matches/" +
          matchId +
          "?api_key=" +
          apiKey
      )
      .then((response) => response.data)
      .catch((err) => err);
    // matchData is equal to response.data with this syntax

    matchDataArray.push(matchData);
  }

  // Save information above after the loop and into an array; then give array as JSON response to the user
  // [Game1Object, Game2Object, ...]
  // res.json is the json representation of matchDataArray; this is what gets sent to our frontend as long as there's no issues
  res.json(matchDataArray);
});

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
