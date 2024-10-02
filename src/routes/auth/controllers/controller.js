const bcrypt = require('bcryptjs');
const auth = require('../../../auth');

const table = 'auth';

module.exports = function (dbInyected) {
  let db = dbInyected;

  if (!db) {
    db = require('../../../db/mysql');
  }

  async function login(usuario, password) {
    const data = await db.query(table, { usuario: usuario });

    console.log(password, data[0].password)

    return bcrypt.compare(password, data[0].password).then((res) => {
      if (res === true) {
        // res === true if doesn't work
        return auth.assignToken({ ...data });
      } else {
        throw new Error('Invalid Information');
      }
    });
  }

  async function add(data) {
    const authData = {
      id: data.id,
    };

    if (data.usuario) {
      authData.usuario = data.usuario;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password.toString(), 5);
    }

    return db.addEntity(table, authData);
  }

  return {
    add,
    login,
  };
};
