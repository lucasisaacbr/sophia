(function () {
	"use strict";

	module.exports = function(app, ensureAdmin) {

		app.get("/dashboard", ensureAdmin, (req, res) => {
			return res.status(200).render("./dashboard_module/index.html");
		});


	}

}());