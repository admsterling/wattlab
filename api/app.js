const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

const port = require('../config').api_port;
const db = require('../config').mongodb;

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const auth = require('./middleware/auth');

const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(auth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || 'An error occurred.';
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    },
  })
);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log('Listening on localhost:' + port);
    });
  })
  .catch((err) => console.log(err));
