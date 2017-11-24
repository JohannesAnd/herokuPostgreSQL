const crypto = require('crypto');

const genRandomString = length => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');

  return {
    salt: salt,
    passwordHash: value
  };
};

module.exports = ({ database }) => {
  const registerUser = (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    console.log('doo', name, password);
    if (!name || !password) {
      res.status(400).send('Must supply name and password');
    }

    const { passwordHash, salt } = sha512(password, genRandomString(16));

    return database
      .query(
        'INSERT INTO Users(name, salt, password_hash) VALUES($1, $2, $3);',
        [name, salt, passwordHash]
      )
      .then(response => {
        res.status(200).send('OK');
      })
      .catch(err => {
        console.log(err);
        res.send(400).send(err);
      });
  };

  const getUsers = (req, res) => {
    return database
      .query('SELECT id, name from Users;')
      .then(users => {
        res.status(200).json({ users: users.rows });
      })
      .catch(err => {
        console.log(err);
        res.send(400).send(err);
      });
  };

  return {
    registerUser,
    getUsers
  };
};
