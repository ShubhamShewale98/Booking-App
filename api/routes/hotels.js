const express = require("express");
const { createHotel, getHotels, getHotel, updateHotel, deleteHotel } = require("../controllers/hotelController");
const Hotel = require("../models/Hotels");
const createError = require("../utils/error");
const router = express.Router();

// POST ADD
router.post("/", createHotel);
//Update
router.put("/:id",updateHotel);
//DELETE
router.delete("/:id", deleteHotel);
//GET Single
router.get("/:id", getHotel);
//GET ALL
router.get("/", getHotels);
module.exports = router;
