(function () {
	"use strict";

	const httpClient = require("../../../shared_module/js/http");

	module.exports = {

		"getActiveUser": function () {
			return httpClient.get("/userInfo");
		}
	}

});