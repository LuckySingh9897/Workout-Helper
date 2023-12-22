const express= require('express');

const router = express.Router();

const {createWorkout,getWorkouts,getWorkout,removeWorkout,updateWorkout} = require('../controllers/workoutController')

//get all the workouts
router.get('/',getWorkouts)

//get a specific workout
router.get('/:id',getWorkout)

//add the new workout
router.post('/', createWorkout)

// delete the specific workout    
router.delete('/:id',removeWorkout)

//update the specific workout
router.patch('/:id',updateWorkout)
//Important note.............
// PUT handles updates by replacing the entire entity, 
//while PATCH only updates the fields that you give it. 
//If you use the PUT method, the entire entity will get updated. 
//In most REST APIs, this means it will overwrite any missing fields to null


module.exports = router