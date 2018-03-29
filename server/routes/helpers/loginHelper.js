(function () {
	"use strict";

	module.exports = function (app, passport) {

		app.get("/login", function (req, res) {
			res.status(200).render("./login_module/index.html");
		});

		app.post("/login", passport.authenticate("local", {
			"successRedirect": "/chat",
			"failureRedirect": "/unauthorized"
		}));

		app.get("/userInfo", function (req, res) {
			return res.status(200).send(req.user);
		});
	}

}());