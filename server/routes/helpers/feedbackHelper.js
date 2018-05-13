(function () {
	"use strict";

	module.exports = function (app, ensureAdmin, feedbackModel) {

		app.post("/insertFeedback", ensureAdmin, (req, res) => {
			let feedbackObject = req.body.fbObj;

			feedbackModel.insertFeedback(feedbackObject)
				.then((mongoResponse) => {
					res.status(200).send(mongoResponse);
				})
				.catch(mongoError => res.status(500).send(mongoError));
		});

		app.post("/getAllFeedbacks", ensureAdmin, (req, res) => {
			feedbackModel.getAll()
				.then((mongoResponse) => {
					res.status(200).send(mongoResponse);
				}).catch(mongoError => res.status(500).send(mongoError));

		});

		app.post("/getPositivesFB", ensureAdmin, (req, res) => {
			feedbackModel.getPositive()
				.then((mongoResponse) => {
					res.status(200).send(mongoResponse);
				}).catch(mongoError => res.status(500).send(mongoError));
		});

		app.post("/getNegativesFB", ensureAdmin, (req, res) => {
			feedbackModel.getNegative()
				.then((mongoResponse) => {
					res.status(200).send(mongoResponse);
				}).catch(mongoError => res.status(500).send(mongoError));
		});
	}

}());