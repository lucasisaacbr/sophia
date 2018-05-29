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
		},
		"changeView": function (context, newView) {
			context.state.view =  newView;
		},
		"examples": function (context, examples) {
			context.state.examples = examples;
		},
		"dialogNodes": function (context, dn) {
			context.state.dialogNodes = dn;
		}
	}

}());

