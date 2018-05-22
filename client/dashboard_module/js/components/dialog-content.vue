<template>
    <div class="sh-content-container">
        <div class="intent-header">
            <h2 id="intent-header-title">Nós de diálogo</h2>
            <a class="button is-primary" @click="">Adicionar Novo Nó</a>
        </div>
        <div v-for="node in getNodes.dialog_nodes">
            {{node}}
        </div>
    </div>
</template>

<script>
	(function () {
		"use strict";

		module.exports = {
			"props": [],
			"name": "DialogContent",
			"data": function () {
				return {

				}
			},
			"methods": {

			},
			"computed": {
                getNodes() {
                	return this.$store.getters["feedbacks/getDialogNodes"];
                }
			},
			"beforeCreate": function () {
                this.$store.dispatch("feedbacks/dialogNodes");
			}
		}

	}());
</script>

<style>

</style>