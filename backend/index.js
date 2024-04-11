require('dotenv').config();  //it get config method from dotenv package to connect env file to main file.

const express = require('express');
// express app
const app = express();
const PORT = process.env.PORT; //process is a global object available in nodeJs
const mongoose = require('mongoose');

const workoutRoutes = require("./routes/workouts");


// middleware
app.use(express.json());

app.use((req,res,next) =>{
    console.log(req.path);
    next();
})

// routes
app.use("/api/workouts",workoutRoutes);


// mongoDb connection............
mongoose.connect(process.env.MONGO_URI)
.then( ()=>{
    console.log("databases connected");
})
.catch((err) =>{
    console.log(err);
})


app.listen(PORT,(req,res)=>{
    console.log("listening on port: " ,PORT);
})