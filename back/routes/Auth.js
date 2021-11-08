const express = require("express");
const models = require("../models/index");
// const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

let router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
//**************validation des donnees recut************ */
  if (!email || !password) {
    return res.status(400).json({ message: "Bad email or password" });
  }

  models.User.findOne({ where: { email: email }, raw: true })
    .then((user) => {
      //***************verification si l utilisateur exist***************/
      if (user === null) {
        return res.status(401).json({ message: "This account does not exist" });
      }
      //**************verification du mot de passe**************/
      bcrypt
        .compare(password, user.password)
        .then((test) => {
          if (!test) {
            return res
              .status(401)
              .json({ message: "Wrong Password", error: err });
          }
          //***************generation du TOKEN***************** */
          //*************le principe de jwt.sign en 1er le payload en 2e la phrase secret et la durree de vie du token************ */
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_DURATION}
          );
          return res.json({ access_token: token });
        })
        .catch((err) =>
          res.status(500).json({ message: "Login process failed", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
});

module.exports = router;
