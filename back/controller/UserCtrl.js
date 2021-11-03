const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

//Routes

module.exports = {
  register: function (req, res, next) {
      const email = req.body.email;
      const password = req.body.password;

      if (email == null || password == null) {
          return res.status(400).json({ message: 'missing-parameters' });
      }

      models.Users.findOne({ 
          attributes: ['email'],
          where: { email: email },
      })
      .then(function(userFound) {
            if (!userFound) {
                bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                    const newUser = models.Users.create({
                        email: newUser.email,
                        password: bcryptedPassword,
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id,
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ message: 'cannot add user' })
                    })
                })
            } else {
                return res.status(409).json({ message: 'user already exist'})
            }
      })
      .catch(function(err) {
          return res.status(500).json({ message: 'unable to verify user'})
      })
  },
  login: function (req, res, next) {},
};
