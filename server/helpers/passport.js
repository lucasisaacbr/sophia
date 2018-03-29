(function () {
	"use strict";

	const LocalStrategy = require("passport-local").Strategy;
	const security = require("../helpers/security");

	module.exports = function (passport, userModel) {

		passport.serializeUser(function (user, done) {
			done(null, user);
		});

		passport.deserializeUser(function (user, done) {
			done(null, user);
		});

		passport.use(new LocalStrategy(
			function (username, password, done) {
				userModel.queryUser({
					"query": {
						"username": username,
					}
				}).then(user => {
					security.validateHash(
						password,
						user.password
					).then(() => {
						delete user.password;
						user.updated = Date.now();
						return done(null, user);
					}).catch(err => done(null, false, err))
				}).catch(err => done(null, false, err))
			}
		));
	}

}());