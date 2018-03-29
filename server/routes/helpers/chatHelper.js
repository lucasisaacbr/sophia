(function () {
	"use strict";

	module.exports = function (app, ensureAuthenticated)  {


		app.get("/chat", ensureAuthenticated, function (req, res) {
			return res.status(200).render("./chat_module/index.html");
		});
	}

}());