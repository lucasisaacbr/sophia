(function () {
	"use strict";
	const Vue = require("vue");

	module.exports = {

		"setUserName": function (context, name) {
			context.state.username = name;
		}

	}

}());

