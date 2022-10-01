const Hotel = require("../models/Hotels");

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
const getHotel = async (req, res, next) => {
  try {
    const HotelSingle = await Hotel.findById(req.params.id);

    res.status(200).json(HotelSingle);
  } catch (err) {
    next(err);
  }
};
const updateHotel = async (req, res, next) => {
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
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Has been Deleted");
  } catch (err) {
    next(err);
  }
};
const getHotels = async (req, res, next) => {
  try {
    const Hotels = await Hotel.find();
    res.status(200).json(Hotels);
  } catch (err) {
    // next(err);
    next(err);
  }
};

module.exports = { createHotel, getHotels, getHotel, updateHotel, deleteHotel };
