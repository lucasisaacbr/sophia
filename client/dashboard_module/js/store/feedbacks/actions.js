(function () {
	"use strict";

	const getPositiveFB = require("../../factory/factory").getPositivesFB;
	const getNegativeFB = require("../../factory/factory").getNegativesFB;
	const getEntities = require("../../factory/factory").getEntities;
	const getIntents = require("../../factory/factory").getIntents;
	const getExamples = require("../../factory/factory").listExamples;
	const getDialogNodes = require("../../factory/factory").listDialogNodes;

	module.exports = {

		"positiveFB": function (context) {
			getPositiveFB()
				.then((fb) => {
				context.commit("positiveFB", fb);
			}).catch(err => console.error(err));
		},
		"negativeFB": function (context) {
			getNegativeFB()
				.then(fb => {
				context.commit("negativeFB", fb);
			}).catch(err => console.error(err));
		},
		"entities": function (context) {
			getEntities()
				.then(entities => {
				context.commit("entities", entities);
			}).catch(err => console.error(err));
		},
		"intents": function (context) {
			getIntents()
				.then(intents => {
				context.commit("intents", intents);
			}).catch(err => console.error(err));
		},
		"examples": function (context, intent) {
			getExamples(intent)
				.then(examples => {
				context.commit("examples", examples);
			}).catch(err => console.log(err));
		},
		"dialogNodes": function (context) {
			getDialogNodes()
				.then(nodes => context.commit("dialogNodes", nodes))
				.catch(err => console.log(err));
		},
		"formatedEntities": function (context) {
			let ettArr = [];
			getEntities()
				.then(entities => {
					entities.entities.forEach(ettObj => ettArr.push(ettObj.entity));
					context.commit("entitiesArray", ettArr);
				})
				.catch(err => console.log(err));
		},
		"formatedIntents": function (context) {
			let ittArr = [];
			getIntents()
				.then(intents => {
					intents.intents.forEach(ittObj => ittArr.push(ittObj.intent));
					context.commit("intentsArray", ittArr);
				})
				.catch(err => console.log(err));
		}

	};

}());