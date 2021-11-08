const express = require("express");
const sequelizes = require("./database/db");
const { sequelize, Users } = require("./models");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const bodyParser = require("body-parser");

const UserRoutes = require("./routes/UserRoute");
const MessageRoutes = require("./routes/MessageRoutes");
const AuthRoutes = require("./routes/Auth");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res, next) => res.send("I m online All is ok"));




app.use("/Users", UserRoutes);
app.use("/Message", MessageRoutes);
app.use("/auth", AuthRoutes);


module.exports = app;
