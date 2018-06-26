(function () {
	"use strict";

	const ensureAuthenticated = function (req, res, next) {
		return req.user ? next() : res.redirect("/login");
	};

	const ensureAdmin = function (req, res, next) {
		return req.user.admin ? next() : res.redirect("/login");
	};


	module.exports = function (app, passport, watsonAssistant, feedbackModel) {

		require("./helpers/loginHelper")(app, passport);
		require("./helpers/chatHelper")(app, ensureAuthenticated, watsonAssistant);
		require("./helpers/feedbackHelper")(app, ensureAdmin, feedbackModel);
		require("./helpers/dashboardHelper")(app, ensureAdmin);
		require("./helpers/watsonHelper")(app, ensureAdmin, watsonAssistant);

		app.get("/", function (req,res) {
			res.redirect("/login");
		});
	}



}());