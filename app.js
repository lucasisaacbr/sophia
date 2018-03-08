(function () {
	"use strict";

	const dotenv = require("dotenv");
	dotenv.load();
	dotenv.config({"silent": true});

	const express = require("express");
	const bodyParser = require("body-parser");
	const engines = require("consolidate");

	const port = process.env.PORT || 3001;
	const path = require("path");
	const cookieSession = require("cookie-session");
	const cookieParser = require("cookie-parser");

	// Cloudant
	const cloudantConfig = require("./server/configs/cloudant").init;
	const cloudantFactory = require("./server/helpers/cloudant")(cloudantConfig);

	// Conversation
	const conversationConfig = require("./server/configs/conversation");
	const conversationMethods = require("./server/helpers/conversation")(cloudantFactory);
	const conversationFactory = require("./server/helpers/conversationFactory")(conversationConfig, conversationMethods);

	// Login dependencies
	const passport = require("passport");
	const passportFactory = require("./server/helpers/passport")(passport, cloudantFactory);

	const app = express();

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(cookieSession({
		"secret": process.env.SECRET_KEY,
		"maxAge": 8640000
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(express.static(path.join(__dirname + '/client')));

	app.engine("html", engines.ejs);
	app.set("view engine", "ejs");
	app.set("views", __dirname + "/client");
	app.disable("x-powered-by");

	app.all("/*", function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
		res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type, Accept, X-Access-Token, X-Key");

		if (req.method === "OPTIONS") {
			res.status(200).end();
		} else {
			next();
		}
	});

	require("./server/routes/index")(app, conversationFactory, cloudantFactory, passport, conversationMethods);

	app.listen(port, function () {
		console.log("Server is running on port " + port);
	});

}());