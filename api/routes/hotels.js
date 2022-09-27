const express = require("express");
const Hotel = require("../models/Hotels");
const router = express.Router();

// POST ADD
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Has been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET Single
router.get("/:id", async (req, res) => {
   
  try {
    const HotelSingle = await Hotel.findById(req.params.id);
    
    res.status(200).json(HotelSingle);
  } catch (err) {
    res.status(500).json(err);
  }

});
//GET ALL
router.get("/", async (req, res,next) => {
  try {
    const Hotels = await Hotel.find();
    res.status(200).json(Hotels);
  } catch (err) {
    // res.status(500).json(err);
    next(err)
  }
});
module.exports = router;
