(function () {
	"use strict";

	const createError = require("http-errors");
	const USERS_COLLECTION_NAME = "users";


	module.exports = function (mongoDB) {

		if (!mongoDB) {
			throw new Error("Can not instantiate adminUser helper without mongoDB and logger object")
		}

		return {
			"queryUser": function (params = {}) {
				return new Promise( (resolve, reject) => {
					if (!params) {
						return reject(createError(400, "Any parameter are received to run the query"));
					}
					mongoDB.findOne(USERS_COLLECTION_NAME, {
						"query": params.query,
						"projection": params.projection || null
					}).then(user => {
						console.log("USER", user);
						return (params.strict && !user ?
								reject(createError(404, `User: ${params.query.username} not found`)) :
								resolve(user)
						);
					}).catch(err => reject(err));
				});
			}
		}
	}

}());