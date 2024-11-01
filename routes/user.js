const express = require("express");

const { body } = require("express-validator");

const authController = require("../contoller/auth");

const routers = express.Router();

const postValidator = [
  body("email")
    .isEmail()
    .withMessage("please enter a valid email") ,
  body("password").trim().isLength({
    min: 8,
  }),
 
  body("firstname").trim().not().isEmpty(),
  body("lastname").trim().not().isEmpty(),
];



// REGISTER
routers.patch("/register", postValidator, authController.signUp);

// LOGIN

routers.post("/login",authController.logIn)
routers.get("/all", authController.get);


module.exports = routers;
