(function () {
	"use strict";

	const Vue = require("vue");
	const Vuex = require("vuex");
	require("@fortawesome/vue-fontawesome");
	const vueFontawesome = require("@fortawesome/vue-fontawesome").FontAwesomeIcon;

	Vue.use(Vuex);
	Vue.component("FontAwesomeIcon", vueFontawesome);

	return new Vue({
		"el": "#app",
		"name": "DashboardModule",
		"store": require("./store/store"),
		"render": function (h) {
			return h(require("./components/app.vue"));
		}
	});

}());
