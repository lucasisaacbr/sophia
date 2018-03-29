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
				console.log(userObj);
				context.commit("setActiveUser", userObj);
			}).catch((err) => {
				console.log(err);
			});
		}
	};

}());