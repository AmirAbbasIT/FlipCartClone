const router=require("express").Router();
const User =require("../models/user");
const jwt=require("jsonwebtoken");
const {SignIn,SignUp,RequireSignIn,Profile}=require("../controllers/auth");
router.post("/signup",SignUp )


router.post("/signin",SignIn)


router.post("/profile",RequireSignIn ,Profile)
module.exports=router;