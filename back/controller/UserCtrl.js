const express = require("express");
const models = require("../models/index");
const bcrypt = require("bcrypt");


let router = express.Router();



exports.getAllUser =  (req, res, next) => {
  models.User.findAll()
    .then((users) => res.json({ data: users }))
    .catch((err) => res.status(500).json({ message: "darabase err", err }));
};

exports.getOneUser =  (req, res, next) => {
  let userId = parseInt(req.params.id);

  //********************verification du champ ID*********************** */
  if (!userId) {
    return res.json(400).json({ message: "Missing parameters" });
  }

  //*********************recuperation de l utilisateur************** */
  models.User.findOne({ where: { id: userId }, raw: true })
    .then((user) => {
      if (user == null) {
        return res.json(400).json({ message: "This user does not exist" });
      }

      //********************utilisateur trouve************************** */
      return res.json({ data: user });
    })

    .catch((err) =>
      res.status(500).json({ message: "User exist error", error: err })
    );
};

exports.createUser = (req, res, next) => {

  //***********************validation des donnees recut********** */
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing data" });
  }

  models.User.findOne({ where: { email: email }, raw: true })
    .then((user) => {
      //*************verification si l utilisateur exist deja*********** */
      if (user !== null) {
        return res
          .status(409)
          .json({ message: `The user ${email} already exists` });
      }
      //***********hachage du mot de passe de l uilisateur************ */
      bcrypt
        .hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
        .then((hash) => {
          req.body.password = hash;
        //*************creation de l utilisateur*************** */
          models.User.create(req.body)
            .then((user) => res.json({ message: "User Created", data: user }))
            .catch((err) =>
              res
                .status(500)
                .json({ message: "User already created ", error: err })
            );
        })
        .catch((err) =>
          res.status(500).json({ message: "Hash process error", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "User already created", error: err })
    );
};

exports.updateUser = (req, res) => {
  let userId = parseInt(req.params.id);
//**************verification si le champ ID est present*************** */
  if (!userId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }
  //**************recherche de l utilisateur************************ */
  models.User.findOne({ where: { id: userId }, raw: true })
    .then((user) => {
      //************verification si l utilisateur exist************* */
      if (user === null) {
        return res.status(400).json({ message: "This user does not exist !" });
      }
      //**********************mise a jour de l utlisitateur************ */
      models.User.update(req.body, { where: { id: userId } })
        .then((user) => res.json({ message: "User Updated"}))
        .catch((err) =>
          res.status(500).json({ message: "database error", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "database error", error: err })
    );
}

exports.deleteUser =  (req, res, next) => {
  let userId = parseInt(req.params.id)
  //***************verification si le champ ID est present************** */
  if(!userId) {
    return res.status(404).json({ message: "Missing Params"})
  }
  //**************suppression de l utilisateur******************* */
  User.destroy({ where: { id: userId }, force: true})
  .then(() => response.status(200).json({message: "User already deleted"}))
  .catch(err =>response.status(500).json({ message: "database error", error: err }))
}

