<template>
    <div id="app">
        <header class="sh-head">

        </header>
        <div class="sh-messages">
            <ul id="msg-container">
                <li v-for="msg in messages" class="msg-lines">
                    <span :class="[{userMsg: msg.user}, {watsonMsg: !msg.user}]">{{ msg.text }}</span>
                </li>
                <li class="feedback" v-if="endOfFlow">
                    <span class="feedback-text"> Sua solicitação foi atendida ? </span>
                    <div class="feedback-icons">
                        <a class="feedback-icon" id="feedback-positive">
                            <font-awesome-icon
                                    :icon="thumbsUp">
                            </font-awesome-icon>
                        </a>
                       <a class="feedback-icon" id="feedback-negative" @click="sendNegativeFeedback">
                           <font-awesome-icon
                                   :icon="thumbsDown">
                           </font-awesome-icon>
                       </a>
                    </div>
                </li>
            </ul>
        </div>
        <footer class="sh-chat">
            <div class="field has-addons msg-input">
                <div class="control input-container">
                    <input class="input" type="text" placeholder="Digite sua menssagem..." v-model="message"
                           @keydown.enter="send" :disabled="endOfFlow">
                </div>
                <div class="control">
                    <a class="button is-info" @click="send" :disabled="endOfFlow">
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
					"message": "",
					"watsonMsg": "",
					"messages": [],
                    "endOfFlow": false,
                    "lastResponseObject": {},
                    "test": []
				}
			},
			"methods": {
				"send": function () {

					if (this.message && !this.endOfFlow) {

						let msg = this.message;
						this.messages.push({
							"user": true,
							"text": msg
						});
						this.message = "";

						factory.sendMessage(msg)
							.then(response => {
								response.output.text.forEach((txt) => {
									this.messages.push({
										"user": false,
										"text": txt
									});
								});

                                if(response.output.end) {
                                    this.endOfFlow = true;
                                }

								this.lastResponseObject = {
									"user": "",
									"intents": response.intents,
									"entities": response.entities,
									"input": response.input,
								};

							})
							.catch(err => console.error(err));
					}

				},
                "sendNegativeFeedback": function () {

					factory.insertFeedback(this.lastResponseObject)
                        .then(()=> console.log("feedback saved"))
						.catch(err => console.error(err));

					this.endOfFlow = false;
				}
			},
            "computed": {
				thumbsUp() {
					return require("@fortawesome/fontawesome-free-solid/faThumbsUp");
				},
                thumbsDown() {
					return require("@fortawesome/fontawesome-free-solid/faThumbsDown");
                }
			},
			"mounted": function () {
				factory.sendMessage("")
					.then(response => {
						factory.getFeedbacks().then(data => this.test = data);
						response.output.text.forEach((txt) => {
							this.messages.push({
								"user": false,
								"text": txt
							});
						});
					})
					.catch(err => console.error(err));
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
        height: calc(100% - 95px);
    }

    .msg-input {
        width: 100%;
        padding: 0 25px;
    }

    .input-container {
        width: 100%;
    }

    #msg-container {
        height: 100%;
        overflow: auto;
        display: flex;
        flex-flow: column;
        padding: 7px 21px;
        justify-content: flex-end;
    }

    .userMsg {
        background-color: #9d9de0;
        color: white;
        margin: 7px;
        border-radius: 10px 10px 2px 10px;
        width: fit-content;
        padding: 7px;
        align-self: flex-end;
    }

    .watsonMsg {
        background-color: #a3a3ad;
        color: white;
        margin: 7px;
        border-radius: 10px 10px 10px 1px;
        width: fit-content;
        padding: 7px;
    }

    .input:focus {
        border-color: silver;
        box-shadow: none !important;
    }

    .input:active {
        border-color: silver;
        box-shadow: none !important;
    }

    .msg-lines {
        display: flex;
        flex-direction: column;
    }

    .feedback {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        padding: 14px;
    }

    .feedback-text {
        background-color: #9d9de0;
        color: #FFF;
        padding: 7px;
        border-radius: 10px;
    }

    .feedback-icons {
        font-size: 1.5em;
        display: flex;
        flex-flow: row;
        width: 155px;
        justify-content: space-around;
    }

    #feedback-negative {
        color: #f77f7f;
    }

    #feedback-positive {
        color: #3273dc;
    }

    #feedback-positive:hover {
        opacity: 0.8;
    }

    #feedback-negative:hover {
        color: rgba(0, 0, 0, 0.4);
    }




</style>
