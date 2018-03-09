(function () {
	"use strict";

	module.exports = function (app, passport) {
		app.post("/login", passport.authenticate("local", {
			"successRedirect": "/teste",
			"failureRedirect": "/login",
			"failureFlash": true
		}));

		app.get("/userInfo", function (req, res) {
			return res.status(200).send(req.user);
		});
	}

}());