const { validationResult } = require("express-validator");
const User = require("../models/users");

const Flights = require("../models/flight");

// GET ALL FLIGHT
exports.getFlight = (req, res, next) => {
  Flights.find()
    .then((flight) => {
      res.status(200).json({
        message: "succesfully fetch",
        flight: flight,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err = new Error("Unable to fetch Flights");
        err.status = 500;
      }
      next(err);
    });
};
// POST A FLIGHT
exports.postFlight = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "validation failed,entered data is incorrect ",
      error: errors.array(),
    });
  }

  const origin = req.body.origin;
  const destination = req.body.destination;
  const departure = req.body.departure;
  const arrival = req.body.arrival;
  const amount = req.body.amount;
  let creator;

  const flight = new Flights({
    origin: origin,
    destination: destination,
    departure: departure,
    arrival: arrival,
    amount: amount,
    imgurl:
      "https://th.bing.com/th/id/R.7faea46c0f3254273ed80f56afd74b69?rik=zuoEbtMXM%2bBvMA&pid=ImgRaw&r=0",
    creator: req.userId,
  });
  flight
    .save()
    .then((posts) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.flight.push(flight);
      return user.save();}).then(result=>{
     
      res.status(201).json({
        message: "Flight posted Succesfully",
        flight: posts,
        creator:{_id:creator._id,name:creator.name}
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        (err = new Error("unable to fetch flight server side error")),
          (err.statusCode = 500);
      }
      next(err);
    });
};
// GET A SINGLE FLIGHT
exports.getSingleFlight = (req, res, next) => {
  const flightId = req.params.flightId;

  Flights.findById(flightId)
    .then((flight) => {
      if (!flight) {
        const err = new Error("Cold not fetch post.");
        err.statusCode = 404;
        throw err;
      }
      res.status(200).json({
        message: "Flight succesfully fetch ",
        flight: flight,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        (err = new Error("unable to fetch flight server side error")),
          (err.statusCode = 500);
      }
      next(err);
    });
};

// SEARCH FLIGHT
exports.getFlightFromTo = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "validation failed,entered data is incorrect ",
      error: errors.array(),
    });
  }
  const { from, to } = req.query;
  Flights.find({ origin: from })
    .then((foundFlights) => {
      if (!foundFlights) {
        const err = new Error("Can not find flight with the name ,Try again ");
        err.statusCode = 404;
        throw err;
      }
      if (foundFlights.isEmpty) {
        const err = new Error(
          "Can not find flight with the name ,array empty ,try again "
        );
        err.statusCode = 404;
        throw err;
      }
      foundFlights.map((flight) => {
        res.status(200).json({
          message: "Flights succesfully fetch",
          flight: flight,
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        const err = new Error("Can not fetch flight server side error ");
        err.statusCode = 500;
      }
      next(err);
    });
};
// UPDATE FLIGHT
exports.updateFlight = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(422).json({
      message: "validation failed,entered data is incorrect ",
      error: errors.array(),
    });
  }
  const flightId = req.params.flightId;
  const body = req.body;

  Flights.findByIdAndUpdate(flightId, { $set: body }, { new: true })
    .then((results) => {
      if (!results) {
        const err = new Error("could not update the post ,try again");
        err.statusCode = 404;
        throw err;
      }
      console.log(results);

      res.json({
        message: "Succesfully updated ",
        flight: results,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        const err = new Error("Can not fetch flight server side error ");
        err.statusCode = 500;
      }
      next(err);
    });
};

// DELETE FLIGHT
exports.deleteFlight = (req, res, next) => {
  const flightId = req.params.flightId;
  Flights.findByIdAndDelete(flightId, { new: true })
    .then((deleted) => {
      if (!deleted) {
        const err = new Error("could not Delete the post ,try again");
        err.statusCode = 404;
        throw err;
      }
      console.log(deleted);

      res.status(200).json({
        message: "Succesfully deleted the flight",
        flight: deleted,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        const err = new Error(
          " Somthing went wrong , could not delete the flight"
        );
        err.statusCode = 500;
      }
      next(err);
    });
};
