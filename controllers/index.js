const database = require('./../config/database')();

module.exports.mainController = require('./mainController')({ database });
module.exports.authController = require('./authController')({ database });
