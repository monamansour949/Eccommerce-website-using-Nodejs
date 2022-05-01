
const UserModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
//const auth = require ("../Middleware/auth");

function findUsers() {
    var users = UserModel.find({});
    return users;
  }

function findOneUser(name){
    var user = UserModel.findOne(
        { name : name});
        return user;
}  
function createUser({name,email,password})
{
    var user = UserModel.create({name,email,password});
    return user;
}

function updateUser(id, name) {
    var newUser = UserModel.findOneAndUpdate({ _id: id }, { name: name });
    return newUser;
  }
  
  async function login({ email, password }) {
    var user = await UserModel.findOne({ email: email });
  
    if (user) {
      var valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          "w6ef77fe7eew6f7ew67",
          { expiresIn: "20h" }
        );
      } else {
        res.status(401).end();
      }
    } 
  }
  
  function deleteUser(id)
  {
    var deletuser=UserModel.findByIdAndDelete({_id:id});
    return deletuser;
  }


module.exports = { findUsers, findOneUser, createUser, updateUser,login,deleteUser };