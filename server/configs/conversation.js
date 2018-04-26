(function () {
	"use strict";

	const user = process.env.CONV_USER;
	const pass = process.env.CONV_PASSWORD;

	module.exports = {
		username: user,
		password: pass,
		version: "v1",
		version_date: "2017-05-26",
		workspace_id: process.env.CONV_WORKSPACE
	}
}());