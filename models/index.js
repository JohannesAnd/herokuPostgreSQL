const database = require('../config/database')();

module.exports = () => {
  require('./User')({ database });
};
