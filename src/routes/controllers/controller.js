const db = require('../../db/mysql');

const table = 'clientes';

function all() {
  return db.getAll(table);
}

function one(id) {
  return db.getOne(table, id);
}

function deleteIt(id) {
  return db.deleteOne(table, id);
}

function add(data) {
  return db.addEntity(table, data)
}

module.exports = {
  all,
  one,
  deleteIt,
  add
};
