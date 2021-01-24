const router = require("express").Router();

const { SignIn, SignUp, RequireSignIn, Profile } = require("../../controllers/admin/auth");



router.post("/signup", SignUp)

router.post("/signin", SignIn)

router.post("/profile", RequireSignIn, Profile)

module.exports = router;