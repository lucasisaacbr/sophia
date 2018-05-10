<template>
    <div class="sh-content-container">
        <h2>Entidades</h2>
        <div> {{ getEntities }}</div>
    </div>
</template>

<script>
	(function () {
		"use strict";

		module.exports = {
			"props": [],
			"name": "EntitiesContent",
			"data": function () {
				return {}
			},
			"methods": {

			},
			"computed": {
				getEntities() {
					return this.$store.getters["feedbacks/getEntities"];
				}
			},
			"beforeCreate": function () {
				this.$store.dispatch("feedbacks/getEntities");
			}
		}

	}());
</script>

<style>

</style>
