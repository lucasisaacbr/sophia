(function () {
	"use strict";

	let credentials = {
		"username": process.env.ASSISTANT_USER,
		"password": process.env.ASSISTANT_PASSWORD,
	};

	let workspace_id = {
		"workspace_id": process.env.ASSISTANT_WORKSPACE
	};

	module.exports = function (app, watsonAssistant) {

		app.post("/getIntents", (req, res) => {
			watsonAssistant.listIntents(credentials, workspace_id)
				.then((intents) => res.status(200).send(intents))
				.catch(err => res.status(500).send(err));
		});

		app.post("/getEntities", (req, res) => {
			watsonAssistant.listEntities(credentials, workspace_id)
				.then((intents) => res.status(200).send(intents))
				.catch(err => res.status(500).send(err));
		});
	}

}());