const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const port = process.env.PORT || 8080;

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./models')();

const router = require('./router');

app.use('/', router());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
