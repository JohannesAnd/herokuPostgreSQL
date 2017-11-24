const express = require('express');
const { Client } = require('pg');

const port = process.env.PORT || 8080;

const client = new Client();
const app = express();

app.use(async (req, res, next) => {
  await client.connect();

  const response = await client.query('SELECT $1::text as message', [
    'Hello world!'
  ]);

  await client.end();

  res.send(response);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
