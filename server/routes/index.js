(function () {
	"use strict";

	const ensureAuthenticated = function (req, res, next) {
		return req.isAuthenticated() || process.isLocal ? next() : res.status(403).render("./login_module/index.html", {"reason": "forbidden"});
	};

	module.exports = function (app, conversationFactory, cloudantFactory, passport, conversationMethods) {

		require("./helpers/loginHelper")(app, passport);

		app.get("/login", function (req, res) {
			res.status(200).render("./login_module/index.html");
		});

		app.get("/teste", ensureAuthenticated, function (req, res) {
			res.status(200).send("Logado");
		})
	}

}());