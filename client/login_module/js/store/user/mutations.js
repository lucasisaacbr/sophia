(function () {
	"use strict";
	const Vue = require("vue");
	const ActiveUser = require("../../model/ActiveUser");
	module.exports = {
		"setUserProperty": function (context, params) {
			Vue.set(context.state.rrmInfo, params.key, params.value);
		},
		"setActiveUser": function (context, user) {
			context.state.rrmInfo = new ActiveUser(user);
		}
	}

}());

