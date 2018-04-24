(function () {
	"use strict";

	const httpClient = require("../../../etc/js/http");

	module.exports = {
		"getActiveUser": function () {
			return httpClient.get("/userInfo");
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

}());
