const productModel = require("../models/products");
const sellerModel = require("../models/sellers")

const res = require("express/lib/response");
const auth = require ("../Middleware/auth")

function findProducts() {
    var products = productModel.find({});
    return products;
  }

function findOneProduct(name){
    var products = productModel.findOne(
        { name : name});
        return products;
}  

function createProduct({name,description,photoPath,price,sellerId})
{
   
      var products = productModel.create({name,description,photoPath,price,sellerId});
      return products;
   
}
async function GetSellerProducts(sellerName){
  
  var products = await productModel.find({}).populate({path :'sellerId', select :'name',
  match: { name: sellerName }})
  var result = products.filter(x=> x.sellerId!= null)
  return result
  }

function updateProduct(pid, name,price) {
    var newProduct = productModel.findOneAndUpdate({ _id: pid }, { name: name ,price:price});
    return newProduct;
  }

  function deleteProduct(pid)
  {
    var deletProduct=productModel.findByIdAndDelete({_id:pid});
    return deletProduct;
  }


module.exports = { findProducts, findOneProduct, createProduct, updateProduct,deleteProduct,GetSellerProducts };