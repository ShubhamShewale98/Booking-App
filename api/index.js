const express = require('express')
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get('/', (req, res) => { res.send('hello') })
const connect = async () => {

    try {
        mongoose.connect(process.env.MONGOURL)
        console.log("connected to db")
    } catch (error) {
        throw error
    }

}
mongoose.connection.on("connect", () => {
    console.log("connected ")
})
mongoose.connection.on("disconnected", () => {
    console.log("disconnected")
})

app.get("/",(req,res)=>{
    res.send("hello first request")
})








app.listen(8080, () => {
    connect()
    console.log('server started')
})