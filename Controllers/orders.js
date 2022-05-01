
const orderModel = require("../models/orders");
const res = require("express/lib/response");


function createOrder({Products,userId})
{
    var orders = orderModel.create({Products,userId});
    return orders;
}

function findUserOrders(userId){
    var order = orderModel.find(
        { userId : userId});
        return order;
}  
function deleteorder(orderid)
  {
    var deletedorder=orderModel.findByIdAndDelete({_id:orderid});
    return deletedorder;
  }


  function findOneorder(orderid){
    var order = orderModel.findOne(
        { _id : orderid});
        return order;
}


module.exports = { createOrder,findUserOrders,deleteorder,findOneorder};
