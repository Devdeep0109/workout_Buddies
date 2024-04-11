const Workouts = require("../models/workouts");
const mongoose = require("mongoose");

// get all  workout
const getWorkouts = async(req,res) =>{
    const workouts = await Workouts.find({}).sort({createdAt : -1});
    res.status(200).json(workouts);
}

//get a single workout
const getWorkout = async(req,res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"no such workouts"});
    }

    const workout = await Workouts.findById(id);
    if(!workout){
        res.status(404).json({error:"no such workouts"});
    }
    res.status(200).json(workout);
}

//create new workout
const createWorkout = async(req,res)=>{
    const {title ,reps,load} = req.body;

    
    let emptyFields = []

    // handling unfill field....
    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill all the field' , emptyFields })
    }

    try{
        const workouts = await Workouts.create({title ,reps,load}); 
        res.status(200).json(workouts);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

// delete a workout
const deleteWorkout = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"no such workouts"});
    }

    const workout = await Workouts.findOneAndDelete({_id: id});
    if(!workout){
        res.status(400).json({error:"no such workouts"});
    }
    res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"no such workouts"});
    }

    const workout = await Workouts.findOneAndUpdate({_id: id},{...req.body});
    if(!workout){
        res.status(400).json({error:"no such workouts"});
    }
    res.status(200).json(workout);
}


module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}