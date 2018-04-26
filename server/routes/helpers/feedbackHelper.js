(function () {
	"use strict";

	 module.exports = function (app, feedbackModel) {

	 	app.post("/insertFeedback", (req, res) => {
		 	let feedbackObject = req.body.fbObj;

		 	feedbackModel.insertFeedback(feedbackObject)
				.then((mongoResponse) => {
					console.log(mongoResponse);
					res.status(200).send(mongoResponse);
				})
				.catch(mongoError => res.status(500).send(mongoError));
		 });

		 app.post("/getAllFeedbacks", (req, res) => {
		 	feedbackModel.getAll()
				.then((mongoResponse) => {
					res.status(200).send(mongoResponse);
				}).catch(mongoError => res.status(500).send(mongoError));

		 });
	 }

}());