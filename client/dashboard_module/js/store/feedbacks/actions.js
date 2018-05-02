(function () {
	"use strict";

	const getPositiveFB = require("../../factory/factory").getPositivesFB;
	const getNegativeFB = require("../../factory/factory").getNegativesFB;

	module.exports = {

		"positiveFB": function (context) {
			getPositiveFB().then((fb) => {
				context.commit("positiveFB", fb);
			}).catch(err => console.error(err));

		},

		"negativeFB": function (context) {
			getNegativeFB().then((fb => {
				context.commit("negativeFB", fb);
			}).catch(err => console.error(err)));
		}

	};

}());