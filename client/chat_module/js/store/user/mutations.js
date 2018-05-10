(function () {
	"use strict";
	const Vue = require("vue");
	const ActiveUser = require("../../model/ActiveUser");

	module.exports = {

		"setUserName": function (context, name) {
			context.state.username = name;
		}

	}

}());

