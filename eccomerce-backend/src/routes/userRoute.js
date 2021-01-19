const router=require("express").Router();
const User =require("../models/user");

router.post("/signup", (req, res) => {

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

})


router.post("/signin",(req,res,next)=>{
  //  res.send(200).sendStatus();
})

module.exports=router;