(function () {
	"use strict";

	const Vue = require("vue");
	const Vuex = require("vuex");
	require("@fortawesome/vue-fontawesome");
	const vueFontawesome = require("@fortawesome/vue-fontawesome").FontAwesomeIcon;

	Vue.component("FontAwesomeIcon", vueFontawesome);
	Vue.use(Vuex);


	return new Vue({
		"el": "#app",
		"name": "ChatModule",
		"render": function (h) {
			return h(require("./components/app.vue"));
		}
	});

}());
