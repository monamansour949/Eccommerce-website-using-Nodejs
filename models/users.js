const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
//const { stringify } = require('querystring');

const userSchema = mongoose.Schema({
    name :{
        type: String,
        required : true,
        minlength : 4,
        maxlength : 20
    } ,
    password :{
        type :String,
        minlength :8 , 
        maxlength : 16,
        required : true
    }
    ,
    email :{
        type : String,
        minlength : 15,
        maxlength : 25,
        required : true,
        unique : true
    }

})

userSchema.pre('save',function(){

    var salt = bcrypt.genSaltSync(10);
   this.password = bcrypt.hashSync(this.password, salt);
})

var UserModel = mongoose.model("user",userSchema);
module.exports= UserModel;

