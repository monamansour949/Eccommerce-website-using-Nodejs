const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    Products : [
        {
            product :{
            
                type: Object,
                required: true,
            },
            quantity: {
              type: Number,
              required: true,
            }
        
        },
    ]
    ,userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
      }
})

const orderModel= mongoose.model('orders', orderSchema);
  module.exports=orderModel


