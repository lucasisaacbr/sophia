(function () {
	"use strict";

	const Vuex = require("vuex");

	module.exports = new Vuex.Store({
		"modules": {
			"feedbacks": require("./feedbacks/module")
		},
		"strict": process.env.NODE_ENV !== "production"
	});

}());