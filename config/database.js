const { Client } = require('pg');

module.exports = () => {
  const client = new Client({
    user: process.env.PGUSER || process.env.USER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE || process.env.USER,
    port: process.env.PGPORT || 5432
  });

  client.connect();

  return client;
};
