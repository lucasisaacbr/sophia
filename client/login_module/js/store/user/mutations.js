(function () {
	"use strict";
	const Vue = require("vue");
	const ActiveUser = require("../../model/ActiveUser");

	module.exports = {

		"setUserProperty": function (context, params) {
			Vue.set(context.state.userInfo, params.key, params.value);
		},
		"setActiveUser": function (context, user) {
			context.state.userInfo = new ActiveUser(user);
		}

	}

}());

