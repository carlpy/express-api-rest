const table = 'clientes';

module.exports = function (dbInyected) {
  let db = dbInyected;

  if (!db) {
    db = require('../../../db/mysql');
  }

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
    return db.addEntity(table, data);
  }

  return {
    all,
    one,
    deleteIt,
    add,
  };
};
