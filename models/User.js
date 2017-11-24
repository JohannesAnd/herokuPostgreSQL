module.exports = ({ database }) => {
  database
    .query(
      `CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(60),
        salt VARCHAR(100),
        password_hash VARCHAR(240)
    );`
    )
    .then(() => {
      console.log('Created User table');
    })
    .catch(err => {
      console.log('Error when creating User table: ', err);
    });
};
