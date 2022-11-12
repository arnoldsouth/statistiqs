# RIOT-API Player Stat Tracking Web App

## Frontend Notes (client)

## Backend Notes (server)

#### Description: A simple player stat tracking web app using Riot Games' Official API endpoints

### Links

- [Riot Games Developers](https://developer.riotgames.com/): Homepage of the Riot Developer Portal
- [Riot Games APIs](https://developer.riotgames.com/apis): You must obtain your own Riot Games Development API Key
- [Data Dragon (ddragon) APIs](https://developer.riotgames.com/docs/lol#data-dragon): Set of static data files that provide images and other information on Riot Games' League of Legends title

### Packages & Dependencies

    [axios](https://axios-http.com/)
    [express](https://expressjs.com/)
    [cors](https://github.com/expressjs/cors)
    [dotenv](https://github.com/motdotla/dotenv)
    [nodemon](https://nodemon.io/)

## Routes: League of Legends

API Server Test Running

`/api`

### Summoner

Summoner Test Running

`/api/summoner`

Return data for a summoner

`/api/summoner/:region&:name`
`/api/summoner/puuid/:region&:name`

Return icon url for a summoner

`/api/summoner/icon/:id`

### Matches

Matches Test Running

`/api/matches`

Return recent matches for a summoner

`/api/matches/:region&:puuid&:count`

### Champions

Champions Test Running

`/api/champions`

Get all champions

`/api/champions/all`

Get all info for specific champion

`/api/champions/champ/:name`

Current Free Champion Rotation

`/api/champions/free/:region`
