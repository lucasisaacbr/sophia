(function () {
	"use strict";

	module.exports = {
		"getUser": function (context) {
			return context.state.user;
		}
	};

}());