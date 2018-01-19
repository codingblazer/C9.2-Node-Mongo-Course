// const jwt = require('jsonwebtoken');
//
// var data = {id:10};
//
// var token = jwt.sign(data,'123secret');
// console.log(token);
//
// var decoded = jwt.verify(token,'123secret');
// console.log('data: '+JSON.stringify(decoded));

const bcrypt = require('bcrypt');
var password = '123abc';
var hashedPass;

//bcrypt contains diff methods calle salts like general salt => first arg are the number of rounds => more rounds, more difficul to crack hut also take more time to apply
bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{ //give plaintext, salt method and you will get callback with the hashed pass
    console.log(hash);
    hashedPass = hash;
  });
});

//this funciton will be used by us => we will take plaintexxt pass from user and compate it with the hash pass which is stored in our database using this func
bcrypt.compare('123abc',hashedPass,(err,res)=>{
  console.log(res); //will be true or false
});
