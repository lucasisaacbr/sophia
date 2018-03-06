<template>
    <div id="app">
        <div id="body-left">
            <div>
                <img src="../../../shared_module/img/Cloud.svg" />
            </div>
        </div>
        <div id="body-right">
            <div id="form-container">
                <h1>
                    Teste
                </h1>
            </div>

            <div id="utils">
                <h6>teste 2</h6>
            </div>
        </div>
    </div>
</template>

<script>
	(function () {
		"use strict";

		module.exports = {
			"props": [],
			"name": "ReportsApp",
			"components": {
			},
			"data": function () {
				return {

				}
			},
			"methods": {

			}
		};

	}());
</script>

<style>
    #app {
        display: flex;
        height: 100%;
        width: 100%;
    }

    #body-left {
        background-color: darkslateblue;
        align-items: center;
        align-content: center;
        display: flex;
        justify-content: space-around;
        width: 50%;
    }

    #body-right {
        align-items: center;
        align-content: center;
        display: flex;
        flex-flow: column;
        width: 50%;
        align-self: center;
    }

</style>