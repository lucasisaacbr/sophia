(function () {
	"use strict";
	const Vue = require("vue");

	module.exports = {

		"userObj": function (context, obj) {
			context.state.user = obj;
		}

	}

}());

