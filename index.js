const express =require("express");
const fs = require("fs");
var app = express();
const mongoose=require("mongoose");
const http = require("http");
const cors=require("cors");
const UserModel= require("./models/users")
//const socket=require("socket.io")

var server =http.createServer(app);
app.use(express.json()); 
app.use(cors())
mongoose.connect("mongodb://localhost:27017/NodeJSProject",()=>{

  console.log("conected to db")

})
const userRoutes=require("./routes/users");
const productRoutes=require("./routes/products");
const sellerRoutes=require("./routes/sellers");
const orderRoutes=require("./routes/orders");
/* app.get("/", async(req, res,next)=>{
    var users= await userModel.find({})
    console.log(users)
     res.render("template",{users})
   }) */
app.use("/users",userRoutes);
app.use("/products",productRoutes);
app.use("/sellers",sellerRoutes);
app.use("/orders",orderRoutes);





server.listen(3333, () => {
    console.log("app started listening on port 3333");
  });
  
