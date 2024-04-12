const config = require("../../config/index.js");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const DATABASE_URL = config.dbUrl;

module.exports = {
  development: {
    url: URI,
    dialect: "postgres",
  },
  test: {
    url: URI,
    dialect: "postgres",
  },
  production: {
    url: DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Importante si usas conexiones SSL sin un certificado firmado por una entidad de certificación.
      },
    },
  },
};
