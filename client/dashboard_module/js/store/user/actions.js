(function () {
	"use strict";

	const getUser = require("../../factory/factory").getActiveUser;

	module.exports = {
		"getUserName": function () {
			getUser().then((user) => {
				return user.username;
			})
		}
	};

}());