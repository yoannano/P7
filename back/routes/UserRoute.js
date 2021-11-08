const express = require("express");
const User = require("../models/user");
const models = require("../models/index");
const bcrypt = require("bcrypt");
const userCtrl = require("../controller/UserCtrl");
const TokenMiddleware = require("../jwt/jwt");

let router = express.Router();

router.get("/",  userCtrl.getAllUser, TokenMiddleware);
router.get("/:id",  userCtrl.getOneUser, TokenMiddleware);
router.patch("/:id",  userCtrl.updateUser, TokenMiddleware);
router.put("/",  userCtrl.createUser, TokenMiddleware );
// router.put('/:id', TokenMiddleware, userCtrl.modifyUser)
// router.delete('/:id', TokenMiddleware, userCtrl.deleteUser);


// router.delete('/trash/:id', (req, res, next) => {
//     let userId = parseInt(req.params.id)

//     if(!userId) {
//         return res.status(400).json({ message: "Missing Params"})
//     }
//     models.User.destroy({ where: {id: userId}})
//             .then(() => res.status(204).json({}))
//             .catch(err => res.status(500).json({ message: "database error", error: err }))
// })

router.delete("/:id", (req, res, next) => {
    let userId = parseInt(req.params.id)

    if(!userId) {
        return res.status(400).json({ message: "Missing Params"})
    }
    models.User.destroy({ where: {id: userId}, force: true})
            .then(() => res.status(204).json({}))
            .catch(err => res.status(500).json({message: "database error", error: err}))
});

module.exports = router;
