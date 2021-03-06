<template>
    <div id="app">
        <header class="sh-head">
        </header>
        <div class="sh-messages">
            <ul id="msg-container">
                <li v-for="msg in messages" class="msg-lines">
                    <span :class="[{userMsg: msg.user}, {watsonMsg: !msg.user}]">
                        {{ msg.text }}
                    </span>
                </li>
                <transition name="fade">
                    <li class="feedback" v-if="endOfFlow">
                        <span class="feedback-text"> Sua solicitação foi atendida ? </span>
                        <div class="feedback-icons">
                            <a class="feedback-icon" id="feedback-positive" @click="sendPositiveFeedback">
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
                </transition>
            </ul>
        </div>
        <footer class="sh-chat">
            <div class="field has-addons msg-input">
                <div class="control input-container">
                    <input class="input" type="text" placeholder="Digite sua menssagem..." v-model="message"
                           @keydown.enter="send" :disabled="endOfFlow" ref="chat">
                </div>
                <div class="control">
                    <a class="button is-info" @click="send" :disabled="endOfFlow">
                        <font-awesome-icon
                                :icon="paperPlane">
                        </font-awesome-icon>
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
									"user": this.getUser,
									"intents": response.intents,
									"entities": response.entities,
									"input": response.input,
                                    "output": response.output.text,
                                    "date": new Date()
								};

							})
							.catch(err => console.error(err));
					}

				},
                "sendNegativeFeedback": function () {

					this.lastResponseObject.positive = false;

					factory.insertFeedback(this.lastResponseObject)
                        .then(()=> {
							this.messages.push({
								"user": false,
								"text": "Obrigado pelo seu feedback!"
							});
							this.endOfFlow = false;
						})
						.catch(err => console.error(err));

				},
                "sendPositiveFeedback": function () {

					this.lastResponseObject.positive = true;
					factory.insertFeedback(this.lastResponseObject)
						.then(()=> {
							this.messages.push({
								"user": false,
								"text": "Obrigado pelo seu feedback! Até a próxima !"
							});
							this.endOfFlow = false;
						})
						.catch(err => console.error(err));
				}
			},
            "computed": {
				thumbsUp() {
					return require("@fortawesome/fontawesome-free-solid/faThumbsUp");
				},
                thumbsDown() {
					return require("@fortawesome/fontawesome-free-solid/faThumbsDown");
                },
                paperPlane() {
					return require("@fortawesome/fontawesome-free-solid/faPaperPlane");
                },
                getUser() {
					return this.$store.getters["user/getUserName"]
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
							this.$refs.chat.focus();
						});
					})
					.catch(err => console.error(err));
			},
            "beforeCreate": function () {
                this.$store.dispatch("user/getUserName");
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
        opacity: 0;
    }

</style>
