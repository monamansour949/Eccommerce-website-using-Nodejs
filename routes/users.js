const express = require("express")
const auth = require ("../Middleware/auth")
var router = express.Router()
const fs = require("fs")

const {
    findUsers,
    findOneUser,
    createUser,
    updateUser,
    login,
    deleteUser
  } = require("../Controllers/users");

  router.get("/", async (req, res, next) => {
    var users = await findUsers();
    if (users) {
      res.json(users);
    } else {
      res.json({ message: "users not found" });
    }
  });
  
  router.post("/login", async (req, res, next) => {
    var token = await login(req.body);
    res.json({ token: token });
  });
  //router.use(auth)


  router.post("/", async (req, res, next) => {
    var body = req.body;
    try {
      var user = await createUser(body);
  
      res.json(user);
    } catch (err) {
      res.status(422).json({ err });
    }
  });

  router.get("/:name", async (req, res, next) => {
    var { name } = req.params;
  
    var user = await findOneUser(name);
  
    res.status(201).json(user);
  });
  
  router.patch("/:id", (req, res, next) => {
    var { id } = req.params;
    var { name } = req.body;
  
    updateUser(id, name)
      .then(() => {
        res.status(200).json({ message: "user is updated successfully" });
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  });


  router.delete("/:id",async(req, res, next) => {
    var { id } = req.params;
    deleteUser(id)
    .then(() => {
      res.status(200).json({ message: "user is deleted succsessfuly" });
    })
    .catch((err) => {
      res.status(422).json(err);
    });
  });

  module.exports = router;