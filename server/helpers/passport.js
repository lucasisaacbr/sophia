(function () {
	"use strict";

	const LocalStrategy = require("passport-local").Strategy;
	const localConfigs = require("../helpers/security");

	module.exports = function (passport, db_factory) {

		passport.serializeUser(function (user, done) {
			done(null, user);
		});

		passport.deserializeUser(function (user, done) {
			done(null, user);
		});

		passport.use(new LocalStrategy(
			function (username, password, done) {
				// db_factory.make_query("SELECT * FROM aluno WHERE email = $1", username).then(function (data) {
				// 	if (data.rows.length > 0) {
				// 		const result = data.rows[0];
				// 		localConfigs.validateHash(password, result.senha).then(function (data) {
				// 			if (data){
				// 				return done(null, {
				// 					"username": username,
				// 					"id": result.ra
				// 				});
				// 			} else {
				// 				return done(null, false)
				// 			}
				// 		}).catch(function (err) {
				// 			return done(null, false);
				// 		})
				// 	} else {
				// 		return done(null, false);
				// 	}
				// }).catch((err) => {
				// 	console.log(err);
				// 	return done(null);
				//
				// });
			})
		)
	}

}());