(function () {
	"use strict";

	module.exports = function Constructor(params) {
		return {
			"email": params.email,
			"ra": params.ra,
			"role": params.role,
			"name": params.name
		}

	}

}());