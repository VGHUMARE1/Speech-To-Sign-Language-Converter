const Users = require("../models/user");
module.exports.renderSignupForm = (req, res) => {
   res.render("templets/signup.ejs");

}

module.exports.renderloginForm = (req, res) => {
  res.render("templets/login.ejs");

}
module.exports.rendercontactpage = (req, res) => {
 res.render("templets/contact.ejs");

}
module.exports.renderaboutpage = (req, res) => {
    res.render("templets/about.ejs");

}

module.exports.renderhomepage = (req, res) => {
    res.render("templets/home.ejs");

}
module.exports.renderanimationpage = (req, res) => {
    res.render("templets/animation.ejs");

}
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new Users({
            email: email,
            username: username
        })
        const registeredUser = await Users.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                req.flash("error", err.message);
                res.redirect("/signup");

            } else {
                res.redirect("/");
                req.flash("success", "register successfully")
            }
        })
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");

    }
}

module.exports.login = (req, res) => {
    req.flash("success", "login successfully")
    res.redirect(res.locals.redirectUrl);

}

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
           return next(err);

        } else {
            req.flash("success", "logout successfully");
            res.redirect("/");
        }
    })

}