const express = require("express");
const router = express.Router();
const passport = require("passport");
const middleware = require("../middleware.js");
const userControllers = require("../controllers/user.js");


router.get("/", (req, res) => {
    res.render("templets/home.ejs");
})
router.get("/home",userControllers.renderhomepage);

router.get("/animation",middleware.isLoggedIn,userControllers.renderanimationpage);

router.get("/about",userControllers.renderaboutpage);

router.get("/contact", userControllers.rendercontactpage);

router.get("/signup", userControllers.renderSignupForm);

router.route("/login")
    .get(userControllers.renderloginForm)
    .post(middleware.redirecturl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userControllers.login);

router.post("/signup", userControllers.signup);

router.get("/logout",userControllers.logout);

module.exports = router;
