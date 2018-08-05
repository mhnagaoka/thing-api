# Thing API

This is a simple CRUD API implemented for stydying purposes.

It is written in JavaScript (using object rest/spread properties, one the latest ES2018 bells and whistles) and was tested in Node.js v10.8.0.

The API tries to follow the REST architecture and uses [hapi.js](https://hapijs.com/) as its primary framework.

For simplicity's sake, no persistence was implemented (yet.) The data is simply kept in memory, so every time you restart the app, the data is lost.

## Running the app locally

Install the dependencies.

```
$ npm install
```

Start the app.

```
$ npm start
```

The logging messages are generate on the console in JSON format. To display the logs in a friendlier way start the app piping the console through pino cli.

```
$ npm start | npx pino
```

## Documentation

The REST API documentation (Swagger UI) will be acessible at http://localhost:3000/documentation.

To open this readme online:

```
$ npm docs
```

## Unit tests

To run the unit tests:

```
$ npm test
```
