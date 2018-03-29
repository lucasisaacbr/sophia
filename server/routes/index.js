(function () {
	"use strict";

	const ensureAuthenticated = function (req, res, next) {
		return req.user ? next() : res.redirect("/login");
	};


	module.exports = function (app, passport) {

		require("./helpers/loginHelper")(app, passport);
		require("./helpers/chatHelper")(app, ensureAuthenticated);

		app.get("/teste", ensureAuthenticated, function (req, res) {
			res.status(200).send("Logado");
		})
	}

}());