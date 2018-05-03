(function () {
	"use strict";

	let credentials = {
		"username": process.env.ASSISTANT_USER,
		"password": process.env.ASSISTANT_PASSWORD
	};

	module.exports = function (app, watsonAssistant) {

		app.post("/getIntents", (req, res) => {
			watsonAssistant.getIntent(credentials)
				.then((intents) => res.status(200).send(intents))
				.catch(err => res.status(500).send(err));
		});

		app.post("/getEntities", (req, res) => {
			watsonAssistant.getEntity(credentials)
				.then((intents) => res.status(200).send(intents))
				.catch(err => res.status(500).send(err));
		});
	}

}());