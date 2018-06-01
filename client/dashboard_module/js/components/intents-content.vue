<template>
    <div class="sh-content-container">
        <div class="intent-header">
            <h2 id="intent-header-title">Intenções</h2>
            <a class="button is-primary" @click="callCreateIntent()">Adicionar Intenção</a>
        </div>
        <div
                v-for="intent in getIntents.intents"
                class="intent-container">
            <div class="intent-card">
                <div class="intent-card-content">
                    <div class="intent-name">
                        <h1><span class="intent-hash">#</span>{{ intent.intent }}
                            <span class="intent-delete">
                                <a class="button is-danger is-small" @click="callDelete(intent.intent)">
                                    <font-awesome-icon
                                            :icon="trash">
                                    </font-awesome-icon>
                                </a>
                            </span>
                        </h1>
                    </div>
                    <div class="intent-description">
                        <span class="intent-title"> Descrição: </span>
                        <p> {{ intent.description }} </p>
                    </div>
                    <hr/>
                    <div class="intent-examples">
                        <h2 class="intent-title">Exemplos <span class="tag is-info is-rounded">{{intent.examples.length}}</span>
                        </h2>
                        <div class="examples-options">
                            <div class="examples-action">

                                <span @click="callAddExample(intent.intent)">
                                     <font-awesome-icon
                                             :icon="plus">
                                     </font-awesome-icon>
                                    Adicionar
                                </span>

                            </div>
                            <div class="examples-action">

                                <span @click="callListExample(intent.intent)">
                                     <font-awesome-icon
                                             :icon="downArrow">
                                     </font-awesome-icon>
                                    Exibir
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal" :class="[{'is-active': showModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Deletar Intencão</p>
                    <button class="delete" aria-label="close" @click="showModal = false"></button>
                </header>
                <section class="modal-card-body intent-name">
                    Deseja realmente delelar a intenção <h1><span class="intent-hash">#</span>{{ intentToDelete }} ?
                </h1>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-danger" @click="deleteIntent(intentToDelete)">Cofirmar</button>
                    <button class="button" @click="showModal = false">Cancelar</button>
                </footer>
            </div>
        </div>


        <div class="modal" :class="[{'is-active': addModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Adicionar Exemplo</p>
                    <button class="delete" aria-label="close" @click="addModal = false"></button>
                </header>
                <section class="modal-card-body intent-name">
                    <div>
                        <h1>Novo exemplo para <span class="intent-hash">#</span>{{ exampleParent }}</h1>
                        <input class="input" type="text" placeholder="Digite o texto do novo exemplo" v-model="exampleText">
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-primary" @click="addExample(exampleParent, exampleText)">Cofirmar</button>
                    <button class="button" @click="addModal = false">Cancelar</button>
                </footer>
            </div>
        </div>


        <div class="modal" :class="[{'is-active': listModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Exemplos</p>
                    <button class="delete" aria-label="close" @click="listModal = false"></button>
                </header>
                <section class="modal-card-body intent-name">
                    <div v-for="example in getExamples.examples">
                        <div class="examples-box">
                            <div class="example-text">
                                {{ example.text }}
                                <span class="intent-delete" @click="deleteExample(intentOfExamples, example.text)">
                                     <font-awesome-icon
                                             :icon="trash">
                                     </font-awesome-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <div class="modal" :class="[{'is-active': createIntentModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Adicionar Intenção</p>
                    <button class="delete" aria-label="close" @click="createIntentModal = false"></button>
                </header>
                <section class="modal-card-body intent-name">
                    <div>
                        <h1>Dica: Uma intenção é a representação de determinada ação </h1>
                        <h1>Ex: A intenção #comprimentos é a representação de saudações </h1>

                        <div class="field is-horizontal">
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Nome da Intenção</label>
                                    <input class="input" type="text" v-model="intentToCreate" placeholder="Nome da Intenção">
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Descrição</label>
                                        <input class="input" type="email" placeholder="O que esta intenção representa ?" v-model="descriptionToCreate">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-primary" :disabled='intentToCreate === ""' @click="createIntent(intentToCreate, descriptionToCreate)">Cofirmar</button>
                    <button class="button" @click="createIntentModal = false">Cancelar</button>
                </footer>
            </div>
        </div>

    </div>
</template>

<script>
	(function () {
		"use strict";

		let factory = require("../factory/factory");

		module.exports = {
			"props": [],
			"name": "IntentsContent",
			"data": function () {
				return {
					"showModal": false,
					"intentToDelete": "",
					"addModal": false,
					"listModal": false,
                    "createIntentModal": false,
					"exampleParent": "",
					"exampleText": "",
                    "intentOfExamples": "",
                    "intentToCreate": "",
                    "descriptionToCreate": ""
				}
			},
			"methods": {
				deleteIntent(intentName) {
					factory.deleteIntent(intentName)
						.then(() => {
							this.showModal = false;
							this.$store.dispatch("feedbacks/intents");
						})
						.catch(err => console.log(err));
				},
				callDelete(intent) {
					this.showModal = true;
					this.intentToDelete = intent;
				},
				callAddExample(intent) {
					this.addModal = true;
					this.exampleParent = intent;
				},
				callListExample(intent) {
					this.listModal = true;
					this.intentOfExamples = intent;
					this.$store.dispatch("feedbacks/examples", intent);
				},
                callCreateIntent() {
					this.createIntentModal = true;
                },
				addExample(intent, example) {
                    factory.addExample(intent, example)
                        .then(() => {
                            this.addModal = false;
                            this.$store.dispatch("feedbacks/examples", intent);
                            this.$store.dispatch("feedbacks/intents");
                        })
                        .catch(err => console.log(err));
				},
                deleteExample(intent, example) {
					factory.deleteExample(intent, example)
                        .then(() => {
                        	this.$store.dispatch("feedbacks/examples", intent);
							this.$store.dispatch("feedbacks/intents");
                        });
                },
                createIntent(intent, description) {
					if (this.intentToCreate) {
						factory.createIntent(intent, description)
							.then(() => {
								this.createIntentModal = false;
								this.$store.dispatch("feedbacks/intents");
								this.intentToCreate = "";
								this.descriptionToCreate = "";
							})
							.catch(err => console.log(err));
                    } else {
						console.error("Preenchimento obrigatório do campo Nome da Intenção");
                    }

                }
			},
			"computed": {
				getIntents() {
					return this.$store.getters["feedbacks/getIntents"];
				},
				getExamples() {
					return this.$store.getters["feedbacks/getExamples"];
				},
				downArrow() {
					return require("@fortawesome/fontawesome-free-solid/faAngleDoubleDown");
				},
				plus() {
					return require("@fortawesome/fontawesome-free-solid/faPlus");
				},
				trash() {
					return require("@fortawesome/fontawesome-free-solid/faTrashAlt");
				}
			},
			"beforeCreate": function () {
				this.$store.dispatch("feedbacks/intents");
			}
		}

	}());
</script>

<style>

    .intent-header {
        padding: 14px;
        background: white;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #intent-header-title {
        padding: 7px;
        font-weight: bold;
        text-transform: uppercase;
        font-style: oblique;
    }
    .intent-hash {
        color: #0f81cc;
        font-weight: 700;
    }

    .intent-delete {
        color: #ff3860;
        font-size: 16px;
        float: right;
        cursor: pointer;
    }

    .intent-name > h1 {
        font-size: 21px;
        font-weight: 400;
        padding: 7px;
    }

    .intent-container {
        background: white;
        padding: 7px 21px;
        border-radius: 4px;
        margin: 7px 0;
    }

    .intent-title {
        font-weight: 600;
    }

    hr {
        margin: 7px !important;
    }

    .intent-description > p {
        padding-left: 21px;
    }

    .examples-options {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .examples-action {
        padding: 14px;
        cursor: pointer;
    }

    .examples-action:hover {
        color: #0f81cc;
    }

    .examples-box {
        padding: 3.5px;
    }

    .examples-box:hover {
        background-color: #f5f5f5;
    }

    .field.is-horizontal {
        flex-direction: column !important;
    }
    .field-label {
        text-align: unset !important;
    }

</style>
