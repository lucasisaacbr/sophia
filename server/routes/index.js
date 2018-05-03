(function () {
	"use strict";

	const ensureAuthenticated = function (req, res, next) {
		return req.user ? next() : res.redirect("/login");
	};


	module.exports = function (app, passport, watsonAssistant, feedbackModel) {

		require("./helpers/loginHelper")(app, passport);
		require("./helpers/chatHelper")(app, ensureAuthenticated, watsonAssistant);
		require("./helpers/feedbackHelper")(app, feedbackModel);
		require("./helpers/dashboardHelper")(app);
		require("./helpers/watsonHelper")(app, watsonAssistant);

	}

}());