const express = require("express");
var router = express.Router();
const auth = require ("../Middleware/auth")
const jwt = require("jsonwebtoken")
const {
   
    createOrder,
    findUserOrders,
    deleteorder,
    findOneorder

  } = require("../Controllers/orders");
const UserModel = require("../models/users");


  router.use(auth)

  router.post("/", async (req, res, next) => {
    var { authorization } = req.headers;
    
    var {id}=jwt.decode(authorization);

    var body = req.body;
    var {userId} = req.body;

    try {
      var user = await UserModel.findOne({_id:id})
      if(user)
      {
      var order = await createOrder(body);
      res.json(order);
      }
      else{
        res.status(422).json({err: "un authorized user name you can't make any orders"});
      }
    } catch (err) {
      res.status(422).json({ err });
    }
  });

  router.get("/:userId", async (req, res, next) => {
    var { userId } = req.params;
  
    var order = await findUserOrders(userId);
  
    res.status(201).json(order);
  });

  router.get("/:orderid/id", async (req, res, next) => {
    var { orderid } = req.params;
  
    var order = await findOneorder(orderid);
  
    res.status(201).json(order);
  });

    
  router.delete("/:orderid",async(req, res, next) => {
    var { orderid } = req.params;
    deleteorder(orderid)
    .then(() => {
      res.status(200).json({ message: "order is deleted succsessfuly" });
    })
    .catch((err) => {
      res.status(422).json(err);
    });
  });


  module.exports = router;