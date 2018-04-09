(function () {
	"use strict";

	const httpClient = require("../../../etc/js/http");

	module.exports = {
		"getActiveUser": function () {
			return httpClient.get("/userInfo");
		},
		"login": function (username, password) {
			return new Promise((resolve, reject) => {
				httpClient.post("/login", {"username": username, "password": password})
					.then(function (data) {
						return resolve(data);
					}).catch(err => {
					return reject(err);
				});
			})

		},
		"sendMessage": function (message) {
			return new Promise((resolve, reject) => {
				httpClient.post("/sendMessage", {"message": message})
					.then(function (data) {
						return resolve(data);
					}).catch(err => {
					return reject(err)
				})
			});
		}
	}

});