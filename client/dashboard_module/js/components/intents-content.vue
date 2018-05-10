<template>
    <div class="sh-content-container">
        <h2>Intenções</h2>
        <div> {{ getIntents }}</div>
    </div>
</template>

<script>
	(function () {
		"use strict";

		module.exports = {
			"props": [],
			"name": "IntentsContent",
			"data": function () {
				return {}
			},
			"methods": {

			},
			"computed": {
				getIntents() {
					return this.$store.getters["feedbacks/getIntents"];
				}
			},
			"beforeCreate": function () {
				this.$store.dispatch("feedbacks/getIntents");
			}
		}

	}());
</script>

<style>

</style>
