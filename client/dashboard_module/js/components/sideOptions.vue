<template>
    <aside class="menu sh-menu">
        <p class="menu-label">
            Feedbacks
        </p>
        <ul class="menu-list">
            <li><a class="is-active">Positivos</a></li>
            <li><a>Negativos</a></li>
        </ul>
        <p class="menu-label">
            Intenções
        </p>
        <ul class="menu-list">
            <li><a>Listar Intenções</a></li>
            <li><a>Adicionar Exemplos</a></li>
            <li><a>Adicionar Contra-exemplos</a></li>
        </ul>
        <p class="menu-label">
            Entidades
        </p>
        <ul class="menu-list">
            <li><a>Listar Entidades</a></li>
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

        },
        "beforeCreate": function () {
            this.$store.dispatch("feedbacks/positiveFB");
        }
    }

}());
</script>

<style>
    .sh-menu {
        max-width: 25%;
        min-width: 210px;
        flex-grow: 1;
        background: papayawhip;
        padding: 7px;
    }
</style>