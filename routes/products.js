const express = require("express");
const auth =require ("../Middleware/auth")
const sellerModel =require("../models/sellers")
const {findOneSellerbyID}= require("../Controllers/sellers")
var router = express.Router();
const jwt = require("jsonwebtoken")

const {
    findProducts,
    findOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    GetSellerProducts

  } = require("../Controllers/products");
const productModel = require("../models/products");
const { json } = require("express/lib/response");

  router.get("/", async (req, res, next) => {
    var products = await findProducts();
    if (products) {
      res.json(products);
    } else {
      res.json({ message: "products is not found" });
    }
  });

  router.use(auth)

  router.post("/", async (req, res, next) => {
    var { authorization } = req.headers;
    
    var {id}=jwt.decode(authorization);

    var body = req.body;
    var {sellerId} = req.body;
    try {
      var seller = await sellerModel.findOne({_id:id})
      if (seller)
      {
        var product = await createProduct(body);
        res.json(product);
      }
      else{
        res.status(422).json({err: "un authorized seller name you can't create any products"});
      }
      
    } catch (err) {
      res.status(422).json(err);
    }
  });

  router.get("/:sellerName/name", async (req, res, next) => {
    var { sellerName } = req.params;
  
    var product = await GetSellerProducts(sellerName);
  
    res.status(201).json(product);
  });


  router.get("/:name", async (req, res, next) => {
    var { name } = req.params;
  
    var product = await findOneProduct(name);
  
    res.status(201).json(product);
  });

  router.patch("/:pid",async (req, res, next) => {
    var { pid } = req.params;
    var { name } = req.body;
    var {price} = req.body;
    var { authorization } = req.headers;
    
    var {id}=jwt.decode(authorization);
    try{
      var seller=await productModel.findOne({_id:pid,sellerId:id})  
      if (seller)
      {
          var product = await updateProduct(pid,name,price)
          return res.json(product);
      }
      else{
        res.status(422).json({err: "un authorized seller name you can't make any updates"});
      }

    }
    catch (err){
      res.status(422).json(err);
    }
    /* updateProduct(pid, name,price)
      .then(() => {
        res.status(200).json({ message: "product is updated successfully" });
      })
      .catch((err) => {
        res.status(422).json(err);
      }); */
  });

  
  router.delete("/:pid",async(req, res, next) => {
    var { pid } = req.params;
    var { authorization } = req.headers;
    
    var {id}=jwt.decode(authorization);
    try{
      var seller=await productModel.findOne({_id:pid,sellerId:id})  
      if (seller)
      {
          var product = await deleteProduct(pid)
          res.status(200).json({ message: "product is deleted succsessfuly" });
      }
      else{
        res.status(422).json({ message: "un authorized seller you can't delete any products" });
      }

    }
    catch (err){
      res.status(422).json(err);
    }

    /* deleteProduct(pid)
    .then(() => {
      res.status(200).json({ message: "product is deleted succsessfuly" });
    })
    .catch((err) => {
      res.status(422).json(err);
    }); */
  });

  module.exports = router;