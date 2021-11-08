const { Sequelize } = require("sequelize");

const sequelizes = new Sequelize ('messagerie_dev', 'root', '', {
    host: "localhost",
    dialect: "mysql",
  }
);
try {
  sequelizes.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

sequelizes.sync((error) => {
  console.log("Database Sync Error", error);
});

module.exports = sequelizes;
