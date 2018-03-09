(function () {
	"use strict";

	const Vue = require("vue");
	const Vuex = require("vuex");

	Vue.use(Vuex);

	return new Vue({
		"el": "#app",
		"name": "LoginModule",
		"store": require("./store/store"),

		"render": function (h) {
			return h(require("./components/app.vue"));
		}
	});

}());
