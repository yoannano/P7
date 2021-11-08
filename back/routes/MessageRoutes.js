const express = require("express");
const models = require("../models/index");
const bcrypt = require("bcrypt");

let router = express.Router();

router.get("", (req, res, next) => {
  models.Message.findAll()
    .then((Message) => res.json({ data: Message }))
    .catch((err) => res.status(500).json({ message: "darabase err", err }));
});

router.get("/:id", (req, res, next) => {
  let MessageId = parseInt(req.params.id);
  if (!MessageId) {
    return res.json(400).json({ message: "Missing parameters" });
  }
  models.Message.findOne({ where: { id: MessageId }, raw: true })
    .then((Message) => {
      if (Message == null) {
        return res.json(400).json({ message: "This Message does not exist" });
      }
      return res.json({ data: Message });
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

  Message.findOne({ where: { email: email }, raw: true })
    .then((Message) => {
      if (Message !== null) {
        return res
          .status(409)
          .json({ message: `The Message ${nom} already exists` });
      }
      bcrypt
        .hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
        .then((hash) => {
          req.body.password = hash;

          Message.create(req.body)
            .then((Message) => res.json({ message: "Message Created", data: Message }))
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
    let MessageId = parseInt(req.params.id)

    if(!MessageId) {
        return res.status(400).json({ message: "Missing Params"})
    }
    models.Message.findOne({ where: {id: MessageId}, raw: true})
        .then((Message) => {
            if(Message === null){
                return res.status(400).json({ message: "This Message does not exist !"})
            }
            Message.update(req.body, { where: {id: MessageId}})
            .then(Message => res.json({ message: "Message Updated"}))
            .catch(err => res.status(500).json({ message: "database error", error: err }))
        })
        .catch(err => res.status(500).json({ message: "database error", error: err }))
});
router.delete('/trash/:id', (req, res, next) => {
    let MessageId = parseInt(req.params.id)

    if(!MessageId) {
        return res.status(400).json({ message: "Missing Params"})
    }
    models.Message.destroy({ where: {id: MessageId}})
            .then(() => res.status(204).json({}))
            .catch(err => res.status(500).json({ message: "database error", error: err }))
})

router.delete("/:id", (req, res, next) => {
    let MessageId = parseInt(req.params.id)

    if(!MessageId) {
        return res.status(400).json({ message: "Missing Params"})
    }
    models.Message.destroy({ where: {id: MessageId}, force: true})
            .then(() => res.status(204).json({}))
});

module.exports = router