<template>
    <div class="sh-content-container">
        <div class="intent-header">
            <h2 id="intent-header-title">Nós de diálogo</h2>
            <a class="button is-primary" @click="">Adicionar Novo Nó</a>
        </div>
        <div
                v-for="node in getNodes.dialog_nodes"
                class="intent-container">
            <div class="intent-card">
                <div class="intent-card-content">
                    <div class="node-top">
                        <div class="node-title"> {{ node.title }} </div>
                        <div class="node-conditions"> {{ node.conditions }}</div>
                    </div>
                    <div class="node-body">
                        <p><span class="card-title"> Ex: </span> {{ node.output.text.values[0] }} </p>
                    </div>
                </div>
            </div>
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
    .node-title {
        font-size: 18px;
        font-weight: bold;
        color: #545252;
    }

    .node-conditions {
        font-size: 14px;
        font-weight: bold;
        color: darkgray;
    }
</style>