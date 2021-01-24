const User = require("../models/user");
const jwt = require("jsonwebtoken");

//SignUp
exports.SignUp=(req, res) => {
    const { email, firstname, lastname, password } = req.body;
    //find user if exists
    User.findOne({ email: email }).exec(async (error, user) => {
        //return message if already exists
        if (user)
            return res.status(400).json({ message: "userAlready Exists" });
        //SaveUser in Db
        const _user = new User({ email, firstname, lastname, password });
        _user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong",
                    error: err
                });
            }
            //send if user created
            if (user) {
                const { _id, firstname, lastname, email, role } = user;
                return res.status(201).json({
                    user: { _id, firstname, lastname, email, role },
                });
            }
        })
    })
}

//SignIn
exports.SignIn=(req,res)=>{
    User.findOne({email:req.body.email}).exec(async (error,user)=>{
        if(error)
        res.status(400).json({error});

        if(user)
        {
            if(user.authenticate(req.body.password)){
                const {_id,email,role}=user;
                const token =jwt.sign({_id,email,role},process.env.JWT_Secret);
                res.status(200).json({token,user});
            }else
            {
                res.status(400).json({message:"Invalid Password"});
            }
        }
    })
}

//RequireSignInMiddleWare
exports.RequireSignIn=(req,res,next)=>{
    const token=req.headers.x_auth;
    const user=jwt.verify(token,process.env.JWT_Secret);
    if(user)
    {
        req.headers.user=user;
        next();
    }
    res.status(400).json({message:"Invalid Token"});

}

//Profile Info
exports.Profile=(req,res)=>{
    const user=req.headers.user;
    res.status(200).json({user});
}