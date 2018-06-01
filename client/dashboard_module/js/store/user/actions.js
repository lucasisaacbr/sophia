(function () {
	"use strict";

	const getUser = require("../../factory/factory").getActiveUser;

	module.exports = {
		"getUserName": function (context) {
			getUser().then((user) => {
				context.commit("setUserName", user.username);
			});
		}
	};

}());