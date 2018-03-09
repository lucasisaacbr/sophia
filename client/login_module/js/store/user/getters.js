(function () {
	"use strict";

	module.exports = {
		"getActiveUser": function (context) {
			return context.state.rrmInfo;
		}
	};

}());