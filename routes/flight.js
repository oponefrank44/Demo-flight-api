const express = require("express");
const { body } = require("express-validator");
const flightController = require("../contoller/flight");
const isAuth=require("../middlewares/is-auth")

const routes = express.Router();
const validateInput = [
  body("origin")
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage("enter a valid Origin"),
  body("destination")
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage("enter a valid Destination"),
  body("departure")
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage("enter a valid depature time"),
  body("arrival")
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage("enter a valid arrival time"),
  body("amount").trim().notEmpty().withMessage("enter a valid amount"),
  body("creator")
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage("enter a valid creator"),
];




// GET ALL FLIGHT
routes.get("/allflights",isAuth, flightController.getFlight);

// POST A FLIGHT
routes.post("/post/flight", isAuth,validateInput, flightController.postFlight);

// GET A SINGLE FLIGHT
routes.get("/flight/:flightId",isAuth, flightController.getSingleFlight);
// SEARCH FLIGHT
routes.get(
  "/flight",
  [
    body("from")
      .trim()
      .isLength({ min: 3 })
      .notEmpty()
      .withMessage("enter a valid Origin"),
    body("to")
      .trim()
      .isLength({ min: 3 })
      .notEmpty()
      .withMessage("enter a valid Origin"),
  ],
  isAuth,
  flightController.getFlightFromTo
);
// UPDATE FLIGHT
routes.patch("/flight/:flightId", isAuth,validateInput, flightController.updateFlight);
// DELETE FLIGHT
routes.delete("/flight/:flightId",isAuth, flightController.deleteFlight);

module.exports = routes;
