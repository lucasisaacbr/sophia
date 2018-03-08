(function () {
	"use strict";

	module.exports = function (app, passport) {
		app.post("/login", passport.authenticate("local", {
			"successRedirect": "/teste",
			"failureRedirect": "/login",
			"failureFlash": true
		}));
	}

}());