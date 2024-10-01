const table = 'usuarios';

module.exports = function (dbInyected) {
  let db = dbInyected;

  if (!db) {
    db = require('../../src/db/mysql');
  }

  function add(data) {
    const authData = {
      id: data.id 
    }

    if (data.usuario) { authData.usuario = data.usuario }
    if (data.password) { authData.password = data.password }

    return db.addEntity(table, data);
  }

  return {
    add,
  };
};
