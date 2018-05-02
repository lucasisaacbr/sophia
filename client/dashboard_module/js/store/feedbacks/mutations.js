(function () {
	"use strict";

	module.exports = {
		"positiveFB": function (context, fb) {
			context.state.positiveFB = fb;
		},
		"negativeFB": function (context, fb) {
			context.state.negativeFB = fb;
		},
		"entities": function (context, ett) {
			context.state.entities = ett;
		},
		"intents": function (context, itt) {
			context.state.intents = itt;
		}
	}

}());

