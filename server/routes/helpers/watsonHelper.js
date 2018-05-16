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
			};
			watsonAssistant.listIntents(credentials, payload)
				.then((intents) => res.status(200).send(intents))
				.catch(err => res.status(500).send(err));
		});

		app.post("/getEntities", ensureAdmin, (req, res) => {
			let payload = {
				...params,
				"export": true
			};
			watsonAssistant.listEntities(credentials, payload)
				.then((intents) => res.status(200).send(intents))
				.catch(err => res.status(500).send(err));
		});

		app.post("/deleteIntent", ensureAdmin, (req, res) => {
			let payload = {
				...params,
				"intent": req.body.intentName
			};
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


		app.post("/deleteEntity", ensureAdmin, (req, res) => {
			let payload = {
				...params,
				"entity": req.body.entityName
			};
			watsonAssistant.deleteEntity(credentials, payload)
				.then((result) => res.status(200).send(result))
				.catch((error) => res.status(500).send(error));
		});

		app.post("/createEntity", ensureAdmin, (req, res) => {
			let payload = {
				...params,
				"entity": req.body.entityName,
				"values": req.body.entityValues
			};
			watsonAssistant.createEntity(credentials, payload)
				.then((result) => res.status(200).send(result))
				.catch((error) => res.status(500).send(error));
		});

		app.post("/createValue", ensureAdmin, (req, res) => {
			let payload = {
				...params,
				"entity": req.body.entityName,
				"value": req.body.value
			};
			watsonAssistant.createValues(credentials, payload)
				.then((result) => res.status(200).send(result))
				.catch((error) => res.status(500).send(error));
		})
	}

}());