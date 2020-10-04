/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./config.json');
const TypeOrmNamingStrategy = require('./src/backend/db/config/TypeOrmNamingStrategy.js')

module.exports = (() => {
  const ret = [];
  config.uniquely.map((v) => {
    return v.db.map((v2) => ({
      name: `${v.name}_${v2.name}`,
      host: v2.host,
      port: v2.port,
      username: v2.username,
      password: v2.password,
      database: v2.database,
      namingStrategy: new TypeOrmNamingStrategy(),
    }));
  }).forEach(v2 => v2.forEach((v3) => ret.push(v3)));

  return ret.map((v) => Object.assign(v, config.common.db));
})();
