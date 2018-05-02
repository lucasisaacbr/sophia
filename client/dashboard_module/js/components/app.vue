<template>
	<div id="app">
        <header class="sh-head"></header>
        <div class="sh-container">
            <side-options></side-options>
            <div></div>
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
                data: {}
            }
        },
        "methods": {

        },
        "computed": {
        	// "feedbacks": this.$store.state.feedbacks
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