var mongoose = require('mongoose');
const validator = require('validator'); //validator is lib for mk
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required : true,
    trim : true,
    minlength : 1,
    unique: true,
    validate:{
      validator: validator.isEmail,
      message: `{VALUE} is not valid email`
    }
  },
  password:{
    type: String,
    require: true,
    minlength: [6,'Password should be more than 6']
  },
  tokens:[{
    access: {
      type : String,
      required : true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.generateAuthToken = function() {
  var user = this; //the user object on which this func is called
  var access = 'auth';

  var userId = user._id.toHexString();
  var token = jwt.sign({_id:userId,access: access},'abcsecret').toString();

  user.tokens.access = access;
  user.tokens.token = token;

  return user.save().then(()=>{
    return token;
  });
};

userSchema.methods.toJSON = function() {
  var user = this;
  var userObj = user.toObject();
  return _.pick(userObj,['_id','email']);
};

var User = mongoose.model('User',userSchema);


module.exports = {User};

//make user email unique
//see mongoose cusotm validation lib for the validations
//validate takes object with 2 prop - take validation => can pass a custom function or some value and message which is to be shown if fails
//npm install validator

//
// Now we will cerate a user model with the validations => download validator lib
// uniue property is added => what if the database already have duplicates => we should first drop the collection and then restart the server => read more about it :m http://pages.plypy.com/2014/06/03/dealing-with-unique-index-of-mongoose-and-mongodb/
//
// So every user will have email, password and tokens. For each of these we are defining the properties and validations. We can give error message if validation fails as [value,message] like done for length in Password
// mongoose always takes token value as array that's why we took array form for definning it..will be discussed in future how it pick tokens => user can have multiple tokend for accesing differetn infos
//here we are defining access type of token and its constraints...access type = 'auth' is example
//then token is actual value of token and its constraints
//in server.js we ahve added a post request for new usser using /users and code is almost same as before
