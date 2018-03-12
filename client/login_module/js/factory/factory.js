(function () {
	"use strict";

	const httpClient = require("../../../shared_module/js/http");

	module.exports = {

		"getActiveUser": function () {
			return httpClient.get("/userInfo");
		},
		"login": function (username, password) {
			httpClient.post("/login", {"username": username, "password": password}).then(function () {
				window.location.href = "/teste";
			}).catch(err => console.error(err));
		}

	}

});