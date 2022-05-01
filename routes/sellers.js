const express = require("express")
const auth = require ("../Middleware/authorize")
var router = express.Router()



const {
    findSellers,
    findOneSeller,
    createSeller,
    updateSeller,
    deleteSeller,
    findOneSellerbyID
    ,login
  } = require("../Controllers/sellers");


  router.post("/login", async (req, res, next) => {
    var token = await login(req.body);
    res.json({ token: token });
  });

  //router.use(auth)

  router.get("/", async (req, res, next) => {
    var users = await findSellers();
    if (users) {
      res.json(users);
    } else {
      res.json({ message: "users not found" });
    }
  });

  router.post("/", async (req, res, next) => {
    var body = req.body;
    try {
      var user = await createSeller(body);
  
      res.json(user);
    } catch (err) {
      res.status(422).json({ err });
    }
  });

  router.get("/:name/name", async (req, res, next) => {
    var { name } = req.params;
  
    var user = await findOneSeller(name);
  
    res.status(201).json(user);
  });
  
  router.get("/:id", async (req, res, next) => {
    var { id } = req.params;
  
    var user = await findOneSellerbyID(id);
  
    res.status(201).json(user);
  });
  


  router.patch("/:id", (req, res, next) => {
    var { id } = req.params;
    var { name } = req.body;
  
    updateSeller(id, name)
      .then(() => {
        res.status(200).json({ message: "seller is updated successfully" });
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  });


  
  router.delete("/:id",async(req, res, next) => {
    var { id } = req.params;
    deleteSeller(id)
    .then(() => {
      res.status(200).json({ message: "seller is deleted succsessfuly" });
    })
    .catch((err) => {
      res.status(422).json(err);
    });
  });

  module.exports = router;