const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const productRoutes= require("./routes/flight")
const userRoute=require("./routes/user")
require("dotenv").config();


const app = express();
app.use(bodyParser.json());

const uri = `${process.env.MONGO_DB_URI}`;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(productRoutes);
app.use("/auth",userRoute)

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(uri
    
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
