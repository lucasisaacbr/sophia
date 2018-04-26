(function () {
	"use strict";

	const ensureAuthenticated = function (req, res, next) {
		return req.user ? next() : res.redirect("/login");
	};


	module.exports = function (app, passport, watsonAssistant, feedbackModel) {

		require("./helpers/loginHelper")(app, passport);
		require("./helpers/chatHelper")(app, ensureAuthenticated, watsonAssistant);
		require("./helpers/feedbackHelper")(app, feedbackModel);

		app.get("/teste", ensureAuthenticated, function (req, res) {
			res.status(200).send("Logado");
		})
	}

}());