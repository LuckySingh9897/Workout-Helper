const workout= require("../models/workoutModel");

const mongoose = require('mongoose');
//to get all the workouts

const getWorkouts=async(req,res)=>{
    const Workout= await workout.find({}).sort({createdAt:-1});
    res.status(202).json(Workout);
}



//to get a single workout


const getWorkout= async(req,res)=>{
    const {id}= req.params;  
    const Workout= await workout.findById(id);
    if(!Workout){   
        return  res.status(404).json({error: "Not found"});
    }

    res.status(202).json(Workout);
}


//to create a workout

const createWorkout=async(req,res)=>{
    const {title,reps,load }= req.body;

    let emptyFields=[];
    if(!title){
        emptyFields.push('title');
    }
    
    if(!load){
        emptyFields.push('load');
    }
    
    if(!reps){
        emptyFields.push('reps');
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: "Please fill all the details",emptyFields})
    }
    try{

         const Workout=  await workout.create({title,reps,load});
         res.status(200).json(Workout);
         
    }catch(error){

        res.status(404).json({error: error.message}); 
    }
}


//to delete a workout

const removeWorkout= async (req,res)=>{
    const {id}= req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).json({error : "No Such Workout Found"});
    }

    const Workout= await workout.findOneAndDelete({_id: id});
    if(!Workout){
        return res.status(404).json({error: 'No such workout'});
    }
    //console.log(Workout);
    res.status(202).json(Workout);
}

// to update the workout

const updateWorkout= async (req,res)=>{
    const {id}= req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
           return res.status(404).json({error : "No Such Workout Found"});
    }

    const Workout= await workout.findOneAndUpdate({_id: id},{
        ...req.body
    });

    if(!Workout){
        return res.status(404).json({error: 'No such workout'});
    }
    const newWorkout= await workout.findById(id);
    res.status(202).json(newWorkout);
}




module.exports={
    createWorkout,
    getWorkouts,
    getWorkout,
    removeWorkout,
    updateWorkout
}