(function () {
	"use strict";

	const getActiveUser = require("../../factory/factory").getActiveUser;
	module.exports = {
		"setActiveUser": function (context) {
			getActiveUser().then((user) => {
				let userObj = {};
				for (let prop in user) {
					if (user.hasOwnProperty(prop)) {
						userObj[prop] = user[prop];
					}
				}

				context.commit("setActiveUser", userObj);
				context.commit("utilities/manageLoadingTask", {
					"id": "setActiveUser",
					"message": "Loading user data",
					"loading": false
				}, {
					"root": true
				});
			}).catch((err) => {
				context.commit("utilities/manageLoadingTask", {
					"id": "setActiveUser",
					"message": "Loading user data",
					"loading": false,
					"error": true
				}, {
					"root": true
				});
				context.dispatch("utilities/openToaster",  {
					"toastType": "error",
					"title": "Error loading active user data",
					"message": `Reason: ${err.message || err}`
				}, {
					"root": true
				});
			});
		}
	};

}());