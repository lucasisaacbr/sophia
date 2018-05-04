<template>
    <aside class="menu sh-menu">
        <p class="menu-label">
            Feedbacks
        </p>
        <ul class="menu-list">
            <li><a class="is-active" @click="negatives">Negativos</a></li>
            <li><a @click="positives">Positivos</a></li>
        </ul>
        <p class="menu-label">
            Intenções
        </p>
        <ul class="menu-list">
            <li><a @click="listIntents">Listar Intenções</a></li>
            <li><a @click="">Adicionar Exemplos</a></li>
            <li><a>Adicionar Contra-exemplos</a></li>
        </ul>
        <p class="menu-label">
            Entidades
        </p>
        <ul class="menu-list">
            <li><a @click="listEntities">Listar Entidades</a></li>
            <li><a>Adicionar Valores</a></li>
            <li><a>Adicionar Synonimos</a></li>
        </ul>
        <p class="menu-label">
            Metricas
        </p>
        <ul class="menu-list">
            <li><a>Dashboard de Métricas</a></li>

        </ul>
    </aside>
</template>

<script>
(function () {
    "use strict";

	module.exports = {
        "props": [],
        "name": "SideOptions",
        "components": {
        },
        "data": function () {
            return {

            }
        },
        "methods": {
            negatives() {
            	this.$store.dispatch("feedbacks/negativeFB").then(() => this.$store.commit("feedbacks/view", "negative"));
            },
            positives() {
				this.$store.dispatch("feedbacks/positiveFB").then(() => this.$store.commit("feedbacks/view", "positive"));
            },
            listIntents() {
				this.$store.dispatch("feedbacks/intents").then(() => this.$store.commit("feedbacks/view", "intent"));
			},
            listEntities() {
				this.$store.dispatch("feedbacks/entities").then(() => this.$store.commit("feedbacks/view", "entity"));
            }
        }
    }

}());
</script>

<style>
    .sh-menu {
        max-width: 25%;
        min-width: 210px;
        flex-grow: 1;
        padding: 7px;
    }
</style>