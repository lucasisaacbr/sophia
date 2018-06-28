(function () {
	"use strict";

	module.exports = function (app, passport) {

		app.get("/login", function (req, res) {
			res.status(200).render("./login_module/index.html");
		});

		app.post("/login", passport.authenticate("local", {
			"successRedirect": "/chat",
			"failureRedirect": "/unauthorized"
		}));

		app.get("/userInfo", function (req, res) {
			return res.status(200).send(req.user);
		});

		app.post("/cadastro", function (req, res) {

			let user = {
				"email": req.body.email,
				"senha": req.body.senha
			};

			if (req.body.perfil) {
				if (req.body.perfil === "admin") {
					user.admin = true;
				} else {
					user.perfil = req.body.perfil;
				}
			}

			require("../../helpers/security").generateHash(user.senha).then(pass => {
				user.senha = pass;
			});

			require("../../helpers/mongo").insertOne("users", {
				"username": user.email,
				"password": user.senha,
				"admin": user.admin || false,
				"perfil": user.perfil || ""
			});

			return res.status(200).send("OK");

		})
	}

}());