<template>
    <div id="app">
        <header class="sh-head">

        </header>
        <div class="sh-messages">

        </div>
        <footer class="sh-chat">
            <div class="field has-addons msg-input">
                <div class="control input-container">
                    <input class="input" type="text" placeholder="Digite sua menssagem.." v-model="message">
                </div>
                <div class="control">
                    <a class="button is-info" @click="send" @keyup.enter="send">
                        Enviar
                    </a>
                </div>
            </div>
        </footer>
    </div>

</template>

<script>
	(function () {
		"use strict";

		let factory = require("../factory/factory");

		module.exports = {

			"name": "MessageModule",
			"data": function () {
				return {
					"message": ""
				}
			},
			"methods": {
				"send": function() {

					let msg = `<span> oi </span>`;

					factory.sendMessage(this.message)
						.then(response => {
                            // Treat chat response
                            console.log(response);
						})
                        .catch(err => console.error(err));
				}
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

    .sh-chat {
        height: 65px;
        background-color: silver;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sh-messages {
        background-color: #f5f5f5;
        height: 100%;
    }

    .msg-input {
        width: 100%;
        padding: 0 25px;
    }

    .input-container {
        width: 100%;
    }


</style>