(function () {
	"use strict";

	module.exports = {
		"state": require("./state"),
		"getters": require("./getters"),
		"mutations": require("./mutations"),
		"actions": require("./actions"),
		"namespaced": true
	};

}());