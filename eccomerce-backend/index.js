const express =require("express");
const dotenv = require("dotenv").config();
const mongoose=require("mongoose");
const app=express();

//configureMongoDB
mongoose.connect(`mongodb+srv://amirabbasIT:${process.env.MONGODB_password}@cluster0.9ieta.mongodb.net/${process.env.MONGODB_database}?retryWrites=true&w=majority`, 
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}).then(()=>{
    console.log("MongoDB is up and running");
});

/// register middlewares
app.use(express.json())

//import Routers
const authRouter=require("./src/routes/userRoute")
///register Routes
app.use("/api",authRouter);

app.get("/",(req,res,next)=>{
    res.status(200).send("Nice to meet you");
})
app.get("*",(req,res,next)=>{
    res.status(400).send("Page Not Found");
})


app.listen(process.env.PORT,()=>{
    console.log("Server is up and running");
})