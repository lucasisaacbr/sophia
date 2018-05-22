(function () {
	"use strict";

	const httpClient = require("../../../etc/js/http");

	module.exports = {
		"getActiveUser": function () {
			return httpClient.get("/userInfo");
		},
		"sendMessage": function (message) {
			return new Promise((resolve, reject) => {
				httpClient.post("/sendMessage", {"message": message})
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"getFeedbacks": function () {
			return new Promise((resolve, reject) => {
				httpClient.post("/getAllFeedbacks")
					.then(data => resolve(data))
					.catch(err => reject(err));
			})
		},
		"insertFeedback": function (fbObj) {
			return new Promise((resolve, reject) => {
				httpClient.post("/insertFeedback", {"fbObj": fbObj})
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"getPositivesFB": function () {
			return new Promise((resolve, reject) => {
				httpClient.post("/getPositivesFB")
					.then(data => resolve(data))
					.catch(err => reject(err));
			})
		},
		"getNegativesFB": function () {
			return new Promise((resolve, reject) => {
				httpClient.post("/getNegativesFB")
					.then(data => resolve(data))
					.catch(err => reject(err));
			})
		},

		"getEntities": function () {
			return new Promise((resolve, reject) => {
				httpClient.post("/getEntities")
					.then(data => resolve(data))
					.catch(err => reject(err))
			});
		},

		"getIntents": function () {
			return new Promise((resolve, reject) => {
				httpClient.post("/getIntents")
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"deleteIntent": function (intentName) {
			return new Promise((resolve, reject) => {
				httpClient.post("/deleteIntent", { "intentName": intentName} )
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"addExample": function (intentName, exampleText) {
			return new Promise((resolve, reject) => {
				httpClient.post("/addExample", { "intentName": intentName, "exampleText": exampleText })
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"listExamples": function (intentName) {
			return new Promise((resolve, reject) => {
				httpClient.post("/listExamples", { "intentName": intentName })
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"deleteExample": function (intentName, exampleText) {
			return new Promise((resolve, reject) => {
				httpClient.post("/deleteExample", { "intentName": intentName, "exampleText": exampleText })
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"createIntent": function (intentName, descriptionText) {
			return new Promise((resolve, reject) => {
				httpClient.post("/createIntent", { "intentName": intentName, "descriptionText": descriptionText })
					.then(data => resolve(data))
					.catch(err => reject(err));
			})
		},
		"deleteEntity": function (entityName) {
			return new Promise((resolve, reject) => {
				httpClient.post("/deleteEntity", { "entityName": entityName} )
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"createEntity": function (entityName) {
			return new Promise((resolve, reject) => {
				httpClient.post("/createEntity", { "entityName": entityName })
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"createValue": function (entityName, newValue, newSynonyms) {
			return new Promise((resolve, reject) => {
				httpClient.post("/createValue", { "entityName": entityName, "value": newValue, "synonyms": newSynonyms})
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"deleteSynonym": function (entityName, value, synonym) {
			return new Promise((resolve, reject) => {
				httpClient.post("/deleteSynonym", {"entityName": entityName, "value": value, "synonym": synonym})
					.then(data => resolve(data))
					.catch(err => reject(err));
			});
		},
		"deleteValue": function (entity, value) {
			return new Promise((resolve, reject) => {
				httpClient.post("/deleteValue", {"entity": entity, "value": value})
					.then(data => resolve(data))
					.catch(err => reject(err));
			})
		},
		"addSynonym": function (entity, value, synonym) {
			return new Promise((resolve, reject) => {
				httpClient.post("/addSynonym", { "entity": entity, "value": value, "synonym": synonym  })
					.then(data => resolve(data))
					.catch(err => reject(err));
			})
		}
	}

}());
