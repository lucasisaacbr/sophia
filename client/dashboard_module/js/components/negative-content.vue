<template>
    <div class="sh-content-container">
        <h2>Feedbacks Negativos</h2>
        <div class="card-container">
                <div  v-for="feedback in getNegatives" class="sh-card">
                    <div class="sh-card-property">
                        <span class="card-title">Usuário</span>
                        <span>{{ feedback.user }}</span>
                    </div>
                    <div class="sh-card-property">
                        <span class="card-title">Entidades</span>
                        <span>{{ extractEntities(feedback.entities)[0].entity }}</span>
                    </div>
                    <div class="sh-card-property">
                        <span class="card-title">Intenções</span>
                        <span>{{ extractIntents(feedback.intents)[0].intent }}</span>
                    </div>
                    <div class="sh-card-property">
                        <span class="card-title">Input</span>
                        <span>{{ feedback.input.text}}</span>
                    </div>
                    <div class="sh-card-property">
                        <span class="card-title">Output</span>
                        <span>{{ feedback.output[0] }}</span>
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
			"name": "NegativeContent",
			"data": function () {
				return {}
			},
			"methods": {
				"extractEntities": function (entities) {
					let ett_arr = [];
					entities.forEach(function (ett) {
						ett_arr.push(ett);
					});
					return ett_arr;
				},
				"extractIntents": function (intents) {
					let itt_arr = [];
					intents.forEach(function (itt) {
						itt_arr.push(itt);
						return itt.intent;
					});
					return itt_arr;
				}
			},
			"computed": {
				getNegatives() {
					return this.$store.getters["feedbacks/getNegatives"];
				}
			},
			"beforeCreate": function () {
				this.$store.dispatch("feedbacks/negativeFB");
			}
		}

	}());
</script>

<style>
    .sh-content-container > h2 {
        background-color: #CCC;
        padding: 14px;
    }

    .card-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .sh-card {
        background-color: white;
        margin: 7px;
        padding: 7px;
    }

    .card-title {
        font-weight: bold;
        color: darkslateblue;
    }
</style>
