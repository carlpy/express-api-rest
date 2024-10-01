const mysql = require('mysql');
const config = require('../config/config');

const db_config = {
  host: config.db_host,
  user: config.db_user,
  database: config.db_name,
  password: config.db_password,
};

let connection;

function db_connection() {
  connection = mysql.createConnection(db_config);

  connection.connect((err) => {
    if (err) {
      console.log(err);
      setTimeout(db_connection, 200);
    } else {
      console.log('Connection succesful');
    }
  });

  connection.on('error', (err) => {
    console.log('[DB ERROR] ', err);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      db_connection();
    } else {
      throw err;
    }
  });
}

db_connection();

function getAll(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function getOne(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function deleteOne(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ?? WHERE id = ?`, [table, data], (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

function addEntity(table, data) {
  if (!data.id) {
    return create(table, data);
  } else {
    return update(table, data);
  }
}

function create(table, data) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO ?? SET ?', [table, data], (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE ?? SET ? WHERE id = ?', [table, data, data.id], (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
}

module.exports = {
  getAll,
  getOne,

  deleteOne,

  addEntity,
};
