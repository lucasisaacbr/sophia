(function () {
	"use strict";

	const watson = require("watson-developer-cloud");

	module.exports = function(conversationConfig, conversationMethods){

		const conversation = new watson.ConversationV1({
			username: conversationConfig.username,
			password: conversationConfig.password,
			version: "v1",
			version_date: conversationConfig.version_date
		});

		return {
			"sendMessage": function(options){
				return new Promise(function (resolve, reject){

					if (!options) {
						reject("Objeto options não existe para ser consultado no Conversation");
					}

					options.workspace_id = options.workspace_id || conversationConfig.workspace_id;

					conversation.message(options, function (err, response) {
						if (err) {
							return reject (err);
						} else {
							return resolve(response);
						}
					});

				});
			},
			"prepareRequest": function (req) {
				let message = req.body.question;
				let context = {};

				if (!message) {
					return reject({
						"status": 500,
						"message": "Campo Mensagem vazio"
					});
				}

				if (req.body.context) {
					try {
						context = JSON.parse(req.body.context);
					} catch (e) {
						console.error(e);
					}
				} else {
					context = {};
				}

				return {
					"input": {
						"text": message
					},
					"context": context
				};
			},
			"extractQuery": function (response) {
				if (!response.context.query) {
					return false;
				}
				return response.context.query;
			},
			"execute": function (context, payload) {
				return new Promise(function (resolve, reject) {
					switch(context) {
						default:
							return payload;
					}
				});
			},
		}
	}


}());