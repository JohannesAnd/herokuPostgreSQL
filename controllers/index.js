const database = require('./../config/database')();
const jwt = require('./../config/jwt')();

module.exports.mainController = require('./mainController')({ database });
module.exports.authController = require('./authController')({ database, jwt });
