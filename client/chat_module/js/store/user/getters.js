(function () {
	"use strict";

	module.exports = {
		"getUserName": function (context) {
			return context.state.username;
		}
	};

}());