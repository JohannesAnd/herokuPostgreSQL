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

module.exports = ({ database, jwt }) => {
  const registerUser = (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
      return res.status(400).send('Must supply name and password');
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
        res.status(400).send(err);
      });
  };

  const loginUser = (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
      return res.status(400).send('Must supply name and password');
    }

    return database
      .query('SELECT * from Users WHERE name=$1;', [name])
      .then(response => {
        if (
          response.rows[0].password_hash ===
          sha512(password, response.rows[0].salt).passwordHash
        ) {
          res.status(200).json({
            success: true,
            token: jwt.generateToken({ ...response.rows[0] })
          });
        } else {
          res
            .status(401)
            .send({ success: false, error: 'Wrong username or password' });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(400)
          .send({ success: false, error: 'Wrong username or password' });
      });
  };

  const getUsers = (req, res) => {
    return database
      .query('SELECT * from Users;')
      .then(users => {
        res.status(200).json(users.rows);
      })
      .catch(err => {
        console.log(err);
        res.send(400).send(err);
      });
  };

  return {
    registerUser,
    loginUser,
    getUsers
  };
};
