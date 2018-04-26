(function () {
	"use strict";

	const Vue = require("vue");

	return new Vue({
		"el": "#app",
		"name": "LoginModule",
		"render": function (h) {
			return h(require("./components/app.vue"));
		}
	});

}());
