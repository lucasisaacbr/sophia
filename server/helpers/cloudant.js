(function () {
	"use strict";
	module.exports = function (Cloudant) {
		return {
			"create": function (collection, payload) {
				const db = Cloudant.db.use(collection);
				return new Promise(function (resolve, reject) {
					db.insert(payload, function(err, data) {
						if (err) {
							reject(err);
						}
						resolve(data);
					});
				});
			},
			"get": function (collection, query) {
				const db = Cloudant.db.use(collection);
				return new Promise(function (resolve, reject) {

					if (!query) {
						return reject("Invalid query");
					}

					db.find(query, function (err, items) {
						if (err) {
							reject({
								"status": 500,
								"message": err
							});
						}
						resolve(items);
					});
				});
			},
			"getAll": function (collection, params) {
				const db = Cloudant.db.use(collection);
				return new Promise(function (resolve, reject) {
					db.list(params, function (err, data) {
						if (err) {
							reject(err);
						} else {
							resolve(data);
						}
					});
				});
			},
			"delete": function (collection, docId, docRev) {
				const db = Cloudant.db.use(collection);
				return new Promise(function (resolve, reject) {
					db.destroy(docId, docRev, function (err) {
						if (err) {
							reject(err);
						}
						resolve(["Document:", docId, "from:", collectionName, "deleted successfully"].join(" "));
					});
				});
			},
			"update": function (collection, payload) {
				const db = Cloudant.db.use(collection);
				return new Promise(function (resolve, reject) {
					db.insert(payload, function (err, data) {
						if (err) {
							reject(err);
						}
						resolve(data);
					});
				});
			},
			"bulkInsert": function (collection, docs) {
				const db = Cloudant.db.use(collection);
				return new Promise(function (resolve, reject) {

					if (typeof docs !== "object") {
						return reject("invalid payload");
					}

					db.bulk(docs, function (err) {
						if (err) {
							reject(err);
						}
						resolve("All documents inserted successfully");
					});
				});
			}
		};

	};

}());
