
require('dotenv').config()
const express= require('express');
const workoutRoute= require('./routes/workouts');

const mongoose= require('mongoose')

//express app created
const app = express();

//middleware


app.use(express.json());      //to make access the req.body()  for post and patch routes by this we can access the req body
app.use((req,res,next)=>{
console.log(req.path,req.method);
next();
})


//routes

app.use('/api/workouts',workoutRoute);

mongoose.connect(process.env.MONG_URL)
.then(()=>{
    
    //listen for request

app.listen(process.env.PORT,()=>{
    console.log('connected to db & Listening on port',process.env.PORT);
})


})
.catch((error)=>{
          console.log(error);
})


