const express = require("express");
const sequelizes = require("./database/db");
const { sequelize, Users } = require("./models");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require('./routes/UserRoute')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res,next) => res.send('I m online All is ok'))
app.get('*', (req, res, next) => res.status(501).send('what the hell are you doing'))

app.use('/Users', userRoutes)




// app.post("/api/user", (req, res, next) => {
//   console.log(req.body);
//   res.status(201).json({ message: "objet créer !" });
// });
// app.use("/api/user", (req, res, next) => {
//   const user = [
//     {
//       id: "azerty",
//       mail: "yo-cbr@hotmail.fr",
//       password: "azerty",
//     },
//     {
//       id: "qsdf",
//       mail: "malonn@hotmail.fr",
//       password: "wxcvbn",
//     },
//   ];
//   res.status(200).json(user);
// });
module.exports = app;
