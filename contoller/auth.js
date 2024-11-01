const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

const User = require("../models/users");

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "validation failed,entered data is incorrect ",
      error: errors.array(),
    });
  }

  const email = req.body.email;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  console.log(email);

  User.findOne({ email: email })
    .then((userWithEmail) => {
      if (userWithEmail) {
        const err = new Error("User with email already existed ");
        err.statusCode = 409;
        throw err;
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hash,
      });
      console.log(user);

      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "user created  Succesfully",
        userId: result._id,
      });
    })

    .catch((err) => {
      if (!err.statusCode) {
        (err = new Error("unable to create user, server side error")),
          (err.statusCode = 500);
      }
      next(err);
    });
};

exports.logIn = (req,res,next) => {

  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;


  User.findOne({ email: email }).then(
    user=>{
      if (!user) {
        const err= new Error(" A user with email can not be found. pls register ");
        err.statusCode=401;
        throw err
      }
      loadedUser=user;
      return bcrypt.compareSync(password,user.password);
    }
  ).then(
    isEqual=>{
      if (!isEqual) {
       
          const err= new Error(" password does not match,try again ");
          err.statusCode=401;
          throw err
        
      }
      // jwson token
      const token=jwt.sign({
email: loadedUser.email, useId: loadedUser._id.toString()
      },"iloveyouperpetualaremyworld",{expiresIn:"1hr"});
      res.status(200).json({
        token:token,useId:loadedUser._id.toString(),message:`succesfully login, welcome ${loadedUser.firstname}`

      })

    }
  ).catch((err) => {
    if (!err.statusCode) {
      (err = new Error("unable to create user, server side error")),
        (err.statusCode = 500);
    }
    next(err);
  })
};



exports.get = (req, res) => {
  res.status(200).json({
    message: "love ya",
  });
};
