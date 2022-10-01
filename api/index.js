const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth");
const hotelRouter = require("./routes/hotels");
const usersRouter = require("./routes/users");
const roomsRouter = require("./routes/rooms");

const app = express();
//Middleware 
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});
const connect = async () => {
  try {
    mongoose.connect(process.env.MONGOURL);
    console.log("connected to db");
  } catch (error) {
    throw error;
  }
};

app.use("/auth", authRouter);
app.use("/hotels", hotelRouter);
app.use("/rooms", roomsRouter);
app.use("/users", usersRouter);
// ERROR HANDLING MIDDLE WARE
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500 ;
  const errorMessage = err.message || "Something Went Wrong" ;
  return res.status(500).json({
    succes:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
  })
});



app.get("/", (req, res) => {
  res.send("hello first request");
});

app.listen(8080, () => {
  connect();
  console.log("server started");
});
///1.00.33