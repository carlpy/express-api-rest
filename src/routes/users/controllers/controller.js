const table = 'usuarios';
const auth = require("../../auth")

module.exports = function (dbInyected) {
  let db = dbInyected;

  if (!db) {
    db = require('../../src/db/mysql');
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

  async function add(data) {
    const user = {
      id: data.id,
      nombre: data.nombre,
      activo: data.activo,
    };

    const response = await db.addEntity(table, user);

    let insertId = 0;
    if (!data.id) {
      insertId = response.insertId;
    } else {
      insertId = data.id;
    }

    let response2
    if (data.usuario || data.password) {
      response2 = await auth.add({
        id: insertId,
        usuario: data.usuario,
        password: data.password,
      });
    }

    return response2;
  }

  return {
    all,
    one,
    deleteIt,
    add,
  };
};
