(function () {
	"use strict";

	const Cloudant = require("cloudant");

	module.exports = {
		"init": new Cloudant({
			"url": process.env.DB_URL,
			"plugins": "promisses"
		}, function (err) {
			if (err) {
				console.log("error connecting to DB " + err);
			} else {
				console.log("connection success");
			}
		})
	};

}());