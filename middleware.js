// const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must loged in");
     return   res.redirect("/login");
      
    } else {
       next();
    }
}

module.exports.redirecturl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
       
    } else {
        res.locals.redirectUrl = "/";
    }
   next();
}