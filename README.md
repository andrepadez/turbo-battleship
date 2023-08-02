# BattleShip PoC with TurboRepo

- web app
- native app (with Expo)
- server (socket.io)

## Running the project

- clone the project
- `cd` into it
- `$ npm install`
- `$ npm run dev` will run the web version on `http://localhost:5173` and the websocket version
- `$ npm run dev:native` will run the expo (react-native) version (doesn't run the server by itself)

## Ready, running and stress-tested

- management of multi-clients
- Room management between clients
- Pre-Game setup

## TODO

- actual Game implementation
- figure out why android is not connecting through socket.io
