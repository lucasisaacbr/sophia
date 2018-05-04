<template>
	<div id="app">
        <header class="sh-head"></header>
        <div class="sh-container">
            <side-options></side-options>
            <div>
                <div v-for="x in getNegatives">
                    <div>{{x}}</div>
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
        "name": "DashbordModule",
        "components": {
            "sideOptions": require("./sideOptions.vue")
        },
        "data": function () {
            return {
                "positives": [],
                "negatives": []
            }
        },
        "methods": {

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
    #app {
        flex-direction: column;
    }

    .sh-head {
        height: 30px;
        width: 100%;
        padding: 5px 8px;
        background-color: darkslateblue
    }

    .sh-container {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
    }
</style>