(function () {
	"use strict";

	module.exports = function (app, ensureAuthenticated, watsonAssistant)  {


		app.get("/chat", ensureAuthenticated, function (req, res) {
			return res.status(200).render("./chat_module/index.html");
		});

		app.post("/sendMessage", (req, res) => {

			let msg = req.body.message;

			let credentials = {
				"username": process.env.ASSISTANT_USER,
				"password": process.env.ASSISTANT_PASSWORD
			};

			let payload = {
				"workspace_id": process.env.ASSISTANT_WORKSPACE,
				"input": {
					"text": msg
				}
			};

			watsonAssistant.sendMessage(credentials, payload)
				.then(response => {
					return res.status(200).send(response);
				})
				.catch(err => res.status(500).send(err));
		});
	}

}());