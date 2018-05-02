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
				return new Promise((resolve, reject) => {
					if (!doc) {
						return reject(createError(400, "Any parameter are received to run the query"));
					}
					mongoDB.insertOne(FEEDBACK_COLLECTION_NAME, doc).then(feedBack => {
						return feedBack ? resolve(feedBack) : reject(createError(404, "Feedback couldnt be inserted"));
					}).catch((err) => {
						console.log("ERROR", err)
					});
				});
			},
			"getAll": function () {
				return new Promise((resolve, reject) => {
					mongoDB.find(FEEDBACK_COLLECTION_NAME)
						.then(allFeedbacks => {
							return resolve(allFeedbacks);
						}).catch(err => reject(err));
				});
			},
			"getPositive": function () {
				return new Promise((resolve, reject) => {
					mongoDB.find(FEEDBACK_COLLECTION_NAME, {
						"query": {
							"positive": true
						}
					})
						.then(positiveFB => {
							return resolve(positiveFB);
						}).catch(err => reject(err));
				});
			},
			"getNegative": function () {
				return new Promise((resolve, reject) => {
					mongoDB.find(FEEDBACK_COLLECTION_NAME, {
						"query": {
							"positive": false
						}
					})
						.then(negativeFB => {
							return resolve(negativeFB);
						}).catch(err => reject(err));
				});
			}
		}
	}

}());