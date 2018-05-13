(function () {
	"use strict";

	let credentials = {
		"username": process.env.ASSISTANT_USER,
		"password": process.env.ASSISTANT_PASSWORD,
	};

	let params = {
		"workspace_id": process.env.ASSISTANT_WORKSPACE
	};

	module.exports = function (app, ensureAdmin, watsonAssistant) {

		app.post("/getIntents", ensureAdmin, (req, res) => {
			let payload = {
				...params,
				"export": true
			}
			watsonAssistant.listIntents(credentials, payload)
				.then((intents) => res.status(200).send(intents))
				.catch(err => res.status(500).send(err));
		});

		app.post("/getEntities", ensureAdmin, (req, res) => {
			watsonAssistant.listEntities(credentials, params)
				.then((intents) => res.status(200).send(intents))
				.catch(err => res.status(500).send(err));
		});

		app.post("/deleteIntent", ensureAdmin, (req, res) => {
			let payload = {
				...params,
				"intent": req.body.intentName
			}
			watsonAssistant.deleteIntent(credentials, payload)
				.then((result) => res.status(200).send(result))
				.catch((error) => res.status(500).send(error));
		});

		app.post("/addExample", ensureAdmin, (req, res) => {

			let payload = {
				...params,
				"intent": req.body.intentName,
				"text": req.body.exampleText
			};

			watsonAssistant.createExample(credentials, payload)
				.then(result => res.status(200).send(result))
				.catch(error => res.status(500).send(error));
		});

		app.post("/listExamples", ensureAdmin, (req, res) => {

			let payload = {
				...params,
				"intent": req.body.intentName
			};

			watsonAssistant.listExamples(credentials, payload)
				.then(result => res.status(200).send(result))
				.catch(error => res.status(500).send(error));
		});

		app.post("/deleteExample", ensureAdmin, (req, res) => {
			let payload = {
				...params,
				"intent": req.body.intentName,
				"text": req.body.exampleText
			};

			console.log(payload);
			watsonAssistant.deleteExample(credentials, payload)
				.then(result => res.status(200).send(result))
				.catch(error => res.status(500).send(error));

		});

		app.post("/createIntent", ensureAdmin, (req, res) => {

			let payload = {
				...params,
				"intent": req.body.intentName,
				"description": req.body.descriptionText
			};

			watsonAssistant.createIntent(credentials, payload)
				.then(result => res.status(200).send(result))
				.catch(error => res.status(500).send(error));
		});
	}

}());