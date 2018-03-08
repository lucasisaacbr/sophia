(function () {
	"use strict";

	const LocalStrategy = require("passport-local").Strategy;
	const localConfigs = require("../helpers/security");

	module.exports = function (passport, cloudantFactory) {

		passport.serializeUser(function (user, done) {
			done(null, user);
		});

		passport.deserializeUser(function (user, done) {
			done(null, user);
		});

		passport.use(new LocalStrategy(
			function (username, password, done) {
				cloudantFactory.get("usuario", {
					"selector": {
						"user": {
							"$eq": username
						}
					},
					"fields": [
						"user",
						"password"
					]
				}).then(function (data) {
					const result = data.docs[0];
					localConfigs.validateHash(password, result.password).then(function (validUser) {
						return done (null, {
							"username": username,
						});
					}).catch(function (err) {
						return done(null, false);
					});
				}).catch(function (err) {
					console.log(err);
					return done(null);
				});
			})
		)
	}

}());