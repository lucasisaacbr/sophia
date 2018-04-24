(function () {
	"use strict";

	const ensureAuthenticated = function (req, res, next) {
		return req.user ? next() : res.redirect("/login");
	};


	module.exports = function (app, passport, watsonAssistant) {

		require("./helpers/loginHelper")(app, passport);
		require("./helpers/chatHelper")(app, ensureAuthenticated, watsonAssistant);

		app.get("/teste", ensureAuthenticated, function (req, res) {
			res.status(200).send("Logado");
		})
	}

}());