<template>
    <aside class="menu sh-menu">
        <p class="menu-label">
            Feedbacks
        </p>
        <ul class="menu-list">
            <li><a :class="[getView === 'negative' ? 'is-active' : '']" @click="negatives">Negativos</a></li>
            <li><a :class="[getView === 'positive' ? 'is-active' : '']" @click="positives">Positivos</a></li>
        </ul>
        <p class="menu-label">
            Intenções
        </p>
        <ul class="menu-list">
            <li><a :class="[getView === 'intent' ? 'is-active' : '']" @click="listIntents">Listar Intenções</a></li>
        </ul>
        <p class="menu-label">
            Entidades
        </p>
        <ul class="menu-list">
            <li><a :class="[getView === 'entity' ? 'is-active' : '']" @click="listEntities">Listar Entidades</a></li>
        </ul>
        <p class="menu-label">
            Conversação
        </p>
        <ul class="menu-list">
            <li><a :class="[getView === 'dialog' ? 'is-active' : '']" @click="dialogView">Nós de diálogo</a></li>
        </ul>
        <p class="menu-label">
            Usuários
        </p>
        <ul class="menu-list">
            <li><a :class="[getView === 'form' ? 'is-active' : '']" @click="signUpForm">Cadastrar</a></li>
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
        "computed": {
        	getView() {
        		return this.$store.getters["feedbacks/getView"]
            }
        },
        "methods": {
            negatives() {
            	this.$store.dispatch("feedbacks/negativeFB").then(() => this.$store.commit("feedbacks/changeView", "negative"));
            },
            positives() {
				this.$store.dispatch("feedbacks/positiveFB").then(() => this.$store.commit("feedbacks/changeView", "positive"));
            },
            listIntents() {
				this.$store.dispatch("feedbacks/intents").then(() => this.$store.commit("feedbacks/changeView", "intent"));
			},
            listEntities() {
				this.$store.dispatch("feedbacks/entities").then(() => this.$store.commit("feedbacks/changeView", "entity"));
            },
            signUpForm() {
            	this.$store.commit("feedbacks/changeView", "form");
            },
            dialogView() {
            	this.$store.commit("feedbacks/changeView", "dialog");
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