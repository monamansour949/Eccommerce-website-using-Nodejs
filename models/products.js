const mongoose = require('mongoose');
const sellerModel = require("../models/sellers")
const { Schema } = mongoose;
const productSchema = mongoose.Schema({

    name :{
        type: String,
        required : true,
        minlength : 4,
        maxlength : 20
    } 
    ,
    description :{
        type:String,
        minlength : 15,
        maxlength : 50
    }
    ,
    photoPath: {
        type : String
    }
    ,
    creationDate :{
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required : true
      }
      
     , sellerId: {
        type: Schema.Types.ObjectId,
        ref: "seller",
        required :true
       
      }
})
const productModel= mongoose.model('products', productSchema);
  module.exports=productModel
