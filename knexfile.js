require('babel-register')
require('./loadenv')

module.exports = require('./config').default.db
