const { config } = require('dotenv');
const { get } = require('env-var');

config();

const envs = {
  port: get('PORT').required().asPortNumber(),

  db_host: get('MYSQL_HOST').required().asString(),
  db_name: get('MYSQL_DB_NAME').required().asString(),
  db_user: get('MYSQL_USER').required().asString(),
  db_password: get('MYSQL_PASSWORD').asString(),
};

module.exports = envs;
