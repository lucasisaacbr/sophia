(function () {
	"use strict";

	const getPositiveFB = require("../../factory/factory").getPositivesFB;
	const getNegativeFB = require("../../factory/factory").getNegativesFB;
	const getEntities = require("../../factory/factory").getEntities;
	const getIntents = require("../../factory/factory").getIntents;

	module.exports = {

		"positiveFB": function (context) {
			getPositiveFB().then((fb) => {
				context.commit("positiveFB", fb);
			}).catch(err => console.error(err));
		},
		"negativeFB": function (context) {
			getNegativeFB().then(fb => {
				context.commit("negativeFB", fb);
			}).catch(err => console.error(err));
		},
		"entities": function (context) {
			getEntities().then(entities => {
				context.commit("entities", entities);
			}).catch(err => console.error(err));
		},
		"intents": function (context) {
			getIntents().then(intents => {
				context.commit("intents", intents);
			}).catch(err => console.error(err));
		}
	};

}());