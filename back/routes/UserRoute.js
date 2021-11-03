const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

let router = express.Router();

router.get("", (req, res, next) => {
  User.findAll()
    .then((users) => res.json({ data: users }))
    .catch((err) => res.status(500).json({ message: "darabase err", err }));
});

router.get("/:id", (req, res, next) => {
  let userId = parseInt(req.params.id);
  if (!userId) {
    return res.json(400).json({ message: "Missing parameters" });
  }
  User.findOne({ where: { id: userId }, raw: true })
    .then((user) => {
      if (user == null) {
        return res.json(400).json({ message: "This user does not exist" });
      }
      return res.json({ data: user });
    })
    .catch((err) =>
      res.status(500).json({ message: "database error", error: err })
    );
});

router.put("", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing data" });
  }

  User.findOne({ where: { email: email }, raw: true })
    .then((user) => {
      if (user !== null) {
        return res
          .status(409)
          .json({ message: `The user ${nom} already exists` });
      }
      bcrypt
        .hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
        .then((hash) => {
          req.body.password = hash;

          User.create(req.body)
            .then((user) => res.json({ message: "User Created", data: user }))
            .catch((err) =>
              res.status(500).json({ message: "database error", error: err })
            );
        })
        .catch((err) =>
          res.status(500).json({ message: "Hash process error", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "database error", error: err })
    );
});

router.patch("/:id",  (req, res, next) => {
    let userId = parseInt(req.params.id)

    if(!userId) {
        return res.status(400).json({ message: "Missing Params"})
    }
    User.findOne({ where: {id: userId}, raw: true})
        .then((user) => {
            if(user === null){
                return res.status(400).json({ message: "This user does not exist !"})
            }
            User.update(req.body, { where: {id: userId}})
            .then(user => res.json({ message: "User Updated"}))
            .catch(err => res.status(500).json({ message: "database error", error: err }))
        })
        .catch(err => res.status(500).json({ message: "database error", error: err }))
});
router.delete('/trash/:id', (req, res, next) => {
    let userId = parseInt(req.params.id)

    if(!userId) {
        return res.status(400).json({ message: "Missing Params"})
    }
    User.destroy({ where: {id: userId}})
            .then(() => res.status(204).json({}))
            .catch(err => res.status(500).json({ message: "database error", error: err }))
})

router.delete("/:id", (req, res, next) => {
    let userId = parseInt(req.params.id)

    if(!userId) {
        return res.status(400).json({ message: "Missing Params"})
    }
    User.destroy({ where: {id: userId}, force: true})
            .then(() => res.status(204).json({}))
});

module.exports = router