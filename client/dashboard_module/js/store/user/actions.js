(function () {
	"use strict";

	const getUser = require("../../factory/factory").getActiveUser;

	module.exports = {
		"getUserObj": function (context) {
			getUser().then((user) => {
				context.commit("userObj", user);
			});
		}
	};

}());