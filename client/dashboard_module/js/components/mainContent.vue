<template>
    <div class="sh-content">
       <negative-content v-if="getView === 'negative'"></negative-content>
    </div>
</template>

<script>
(function () {
    "use strict";

    module.exports = {
        "props": [],
        "name": "MainContent",
        "components": {
			"negativeContent": require("./negative-content.vue")
		},
        "data": function () {
            return {

            }
        },
        "methods": {

        },
        "computed": {
            getView() {
				return this.$store.getters["feedbacks/getView"];
            }
        },
        "beforeCreate": function () {
			this.$store.dispatch("feedbacks/negativeFB");
		}
    }

}());
</script>

<style>
    .sh-content{
        padding: 7px;
        background-color: #f5f5f5;
        width: 100%;
    }

    .fb-row {

    }
</style>
