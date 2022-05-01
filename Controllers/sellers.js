
const sellerModel = require("../models/sellers");
const productModel = require("../Controllers/products");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const auth = require ("../Middleware/authorize");

function findSellers() {
    var sellers = sellerModel.find({});
    return sellers;
  }

function findOneSeller(name){
    var seller = sellerModel.findOne(
        { name : name});
        return seller;
} 

function findOneSellerbyID(id){
  var seller = sellerModel.findById({_id:id});
      return seller;
}

function createSeller({name,email,password})
{
    var seller = sellerModel.create({name,email,password});
    return seller;
}

function updateSeller(id, name) {
    var newSeller = sellerModel.findOneAndUpdate({ _id: id }, { name: name });
    return newSeller;
  }
  
  async function login({ email, password }) {
    var seller = await sellerModel.findOne({ email: email });
  
    if (seller) {
      var valid = await bcrypt.compare(password, seller.password);
      if (valid) {
        return jwt.sign(
          {
            email: seller.email,
            id: seller._id,
          },
          "w6ef77fe7eew6f7ew67",
          { expiresIn: "20h" }
        );
      } else {
        res.status(401).end();
      }
    } 
  }
  
  function deleteSeller(id)
  {
    var deletseller=sellerModel.findByIdAndDelete({_id:id});
    return deletseller;
  }


module.exports = { findSellers, findOneSeller, createSeller, updateSeller,login,deleteSeller,findOneSellerbyID };