(function () {
	"use strict";

	module.exports = {
		"getPositives": function (context) {
			return context.state.positiveFB;
		},
		"getNegatives": function (context) {
			return context.state.negativeFB;
		},
		"getIntents": function (context) {
			return context.state.intents;
		},
		"getEntities": function (context) {
			return context.state.entities;
		},
		"getView": function (context) {
			return context.state.view;
		},
		"getExamples": function (context) {
			return context.state.examples;
		}
	};

}());