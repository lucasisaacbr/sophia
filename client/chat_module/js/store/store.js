(function () {
	"use strict";

	const Vuex = require("vuex");


	module.exports = new Vuex.Store({
		"modules": {
			"user": require("./user/module")
		},

		"strict": process.env.NODE_ENV !== "production"
	});

}());