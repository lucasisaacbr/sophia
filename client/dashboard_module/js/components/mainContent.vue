<template>
    <div class="sh-content">
        <negative-content v-if="getView === 'negative'"></negative-content>
        <positive-content v-if="getView === 'positive'"></positive-content>
        <intents-content v-if="getView === 'intent'"></intents-content>
        <entities-content v-if="getView === 'entity'"></entities-content>
    </div>
</template>

<script>
(function () {
    "use strict";

    module.exports = {
        "props": [],
        "name": "MainContent",
        "components": {
			"negativeContent": require("./negative-content.vue"),
            "positiveContent": require("./positive-content.vue"),
            "intentsContent": require("./intents-content.vue"),
            "entitiesContent": require("./entities-content.vue")
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
        border-left: 1px solid #CCC;
        overflow: auto;
        width: 100%;
    }

    .sh-content-container {
        height: 100%;
    }
</style>
