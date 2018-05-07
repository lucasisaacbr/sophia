<template>
    <div>
        <h2>Feedbacks Negativos</h2>
        <div>
            <ul>
                <li v-for="feedback in getNegatives" class="fb-row"> {{ feedback }} </li>
            </ul>
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
            return {

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

</style>
