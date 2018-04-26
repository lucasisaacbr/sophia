(function () {
	"use strict";

	const Vue = require("vue");
	require("@fortawesome/vue-fontawesome");
	const vueFontawesome = require("@fortawesome/vue-fontawesome").FontAwesomeIcon;

	Vue.component("FontAwesomeIcon", vueFontawesome);

	return new Vue({
		"el": "#app",
		"name": "DashboardModule",
		"render": function (h) {
			return h(require("./components/app.vue"));
		}
	});

}());
