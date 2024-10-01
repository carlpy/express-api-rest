const db = require('../../db/mysql');
const controller = require('./controllers/controller');

module.exports = controller(db);
