(function () {
	"use strict";

	const createError = require("http-errors");
	const FEEDBACK_COLLECTION_NAME = "feedbacks";


	module.exports = function (mongoDB) {

		if (!mongoDB) {
			throw new Error("Can not instantiate adminUser helper without mongoDB and logger object")
		}

		return {
			"insertFeedback": function (doc) {
				return new Promise( (resolve, reject) => {
					if (!doc) {
						return reject(createError(400, "Any parameter are received to run the query"));
					}
					mongoDB.insertOne(FEEDBACK_COLLECTION_NAME, doc, "test").then(feedBack => {
						return feedBack ? reject(createError(404, `Feedback couldnt be inserted`)) : resolve(feedBack);

					}).catch(err => reject(err));
				});
			},
			"getAll": function () {
				return new Promise((resolve, reject) => {
					mongoDB.find(FEEDBACK_COLLECTION_NAME, "test")
						.then(allFeedbacks => {
							console.log("here", allFeedbacks);
						return resolve(allFeedbacks);
					}).catch(err => reject(err));
				});
			}
		}
	}

}());