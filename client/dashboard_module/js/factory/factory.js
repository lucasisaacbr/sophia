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
		},
		"getFeedbacks": function () {
			return new Promise((resolve, reject) => {
				httpClient.post("/getAllFeedbacks")
					.then(function (data) {
						return resolve(data);
					})
					.catch(err => reject(err));
			})
		},
		"insertFeedback": function (fbObj) {
			return new Promise((resolve, reject) => {
				httpClient.post("/insertFeedback", {"fbObj": fbObj})
					.then((data) => {
						resolve(data);
					})
					.catch(err => reject(err));
			});
		},
		"getPositivesFB": function () {
			return new Promise((resolve, reject) => {
				httpClient.post("/getPositivesFB")
					.then(function (data) {
						return resolve(data);
					})
					.catch(err => reject(err));
			})
		},
		"getNegativesFB": function () {
			return new Promise((resolve, reject) => {
				httpClient.post("/getNegativesFB")
					.then(function (data) {
						return resolve(data);
					})
					.catch(err => reject(err));
			})
		},
	}

}());
