(function () {
	"use strict";

	module.exports = function(app) {

		app.get("/dashboard", (req, res) => {
			return res.status(200).render("./dashboard_module/index.html");
		});


	}

}());