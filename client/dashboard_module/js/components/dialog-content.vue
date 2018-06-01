<template>

    <div class="sh-content-container">
        <div class="intent-header">
            <h2 id="intent-header-title">Nós de diálogo</h2>
            <a class="button is-primary" @click="openCreateDialog()">Adicionar Novo Nó</a>
        </div>
        <div
                v-for="node in getNodes.dialog_nodes"
                class="intent-container">
            <div class="intent-card">
                <div class="intent-card-content">
                    <div class="node-top">
                        <div class="node-title"> {{ node.title }}
                            <span class="intent-delete">
                                <a class="button is-danger is-small" @click="openDeleteModal(node.dialog_node)">
                                    <font-awesome-icon
                                         :icon="trash">
                                    </font-awesome-icon>
                                </a>
                            </span>
                        </div>
                        <div class="node-conditions"> {{ node.conditions }}</div>
                    </div>
                    <div class="node-body" v-if="node.output.text.values">
                        <p><span class="card-title"> Ex: </span> {{ node.output.text.values[0] }} </p>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal" :class="[{'is-active': showModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Deletar Nó de Dialogo</p>
                    <button class="delete" aria-label="close" @click="closeDeleteModal"></button>
                </header>
                <section class="modal-card-body intent-name">
                    Deseja realmente delelar o nó de dialogo <h1>{{ nodeToBeDeleted }} ?
                </h1>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-danger" @click="deleteNode(nodeToBeDeleted)">Cofirmar</button>
                    <button class="button" @click="closeDeleteModal">Cancelar</button>
                </footer>
            </div>
        </div>



        <div class="modal" :class="[{'is-active': createDialogModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Adicionar Nó de Diálogo</p>
                    <button class="delete" aria-label="close" @click="closeCreateDialog()"></button>
                </header>
                <section class="modal-card-body intent-name">
                    <div>
                        <h1>Dica: Um nó de diálogo é a estrutura de conversação.</h1>
                        <h1>Combine as entidades e intenções relevantes e forneça a resposta mais adequada para seu cliente. </h1>
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Nome do nó</label>
                                <input class="input" type="text" v-model="newNodeName" placeholder="Nome do nó">
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Se o bot reconhecer:</label>
                                    <div class="field is-grouped">
                                        <p class="control">
                                            <a class="button is-primary is-rounded" @click="chooseEntity">Entidade</a>
                                        </p>
                                        <p class="control">
                                            <a class="button is-primary is-rounded" @click="chooseIntent">Intenção</a>
                                        </p>
                                    </div>
                                </div>
                                <div style="padding: 7px; display: flex">
                                    <div v-if="addEntity" style="width: 100%;">
                                        <label class="label">Entidade</label>
                                        <multiselect
                                                v-model="ett"
                                                :options="getEntities"
                                                :searchable="false"
                                                :close-on-select="true"
                                                :show-labels="false"
                                                placeholder="Entidade...">
                                        </multiselect>
                                    </div>
                                    <div v-if="addEntity && addIntent">
                                        <label class="label">lógica</label>
                                        <multiselect
                                                v-model="logic"
                                                :options="logicOptions"
                                                :searchable="false"
                                                :close-on-select="true"
                                                :show-labels="false"
                                                placeholder="logica">
                                        </multiselect>
                                    </div>
                                    <div v-if="addIntent" style="width: 100%;">
                                        <label class="label">Intenção</label>
                                        <multiselect
                                                v-model="itt"
                                                :options="getIntents"
                                                :searchable="false"
                                                :close-on-select="true"
                                                :show-labels="false"
                                                placeholder="Intenção...">
                                        </multiselect>
                                    </div>
                                </div>
                                <div v-if="isFilled">
                                    <label class="label">Resposta</label>
                                    <input class="input" type="text" placeholder="Resposta" v-model="nodeResponse">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-primary" :disabled='nodeResponse === ""' @click="createDialog()">Cofirmar</button>
                    <button class="button" @click="closeCreateDialog()">Cancelar</button>
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
			"name": "DialogContent",
            "components": {
				"Multiselect": require("vue-multiselect").default
			},
			"data": function () {
				return {
                    "createDialogModal": false,
                    "showModal": false,
                    "newNodeName": "",
                    "nodeToBeDeleted": "",
                    "addIntent": false,
                    "addEntity": false,
                    "ett": "",
                    "itt": "",
                    "logic": "e",
                    "logicOptions": ["e", "ou"],
                    "entityList": [],
                    "intentList": [],
                    "nodeResponse": ""
				}
			},
			"methods": {
                "openCreateDialog": function () {
                    return this.createDialogModal = true;
				},
                "closeCreateDialog": function () {
                	this.newNodeName = "";
                	this.ett = "";
                	this.itt = "";
                	this.addEntity = false;
                	this.addIntent = false;
                	this.nodeResponse = "";
                    return this.createDialogModal = false;
				},
                "deleteNode": function (node_name) {
                    factory.deleteDialogNode(node_name)
                        .then(() => {
							this.$store.dispatch("feedbacks/dialogNodes");
							this.showModal = false;
						})
                        .catch((err) => console.error(err));
				},
                "openDeleteModal": function (node_dialog) {
                	this.nodeToBeDeleted = node_dialog;
                    this.showModal = true;
				},
                "closeDeleteModal": function () {
                    this.nodeToBeDeleted = "";
                    this.showModal = false;
				},
                "chooseEntity": function () {
					this.addEntity += !this.addEntity;
				},
                "chooseIntent": function () {
					this.addIntent += !this.addIntent;
				},
                "createDialog": function () {
                    let title = this.newNodeName;
                    let dialog_node = title.split(" ").join("_");
                    let nodeResponse = this.nodeResponse;
                    let conditions = "";

                    if (this.ett) {
                    	conditions = "@"+ this.ett;
                    }

                    if (this.itt) {
                    	conditions = "#"+ this.itt;
                    }

                    if (this.ett && this.itt) {
                    	if (this.logic === "e") {
                    		conditions = "#" + this.itt + " && " + "@" + this.ett;
                        } else {
                            conditions = "#" + this.itt + " || " + "@" + this.ett;
                        }
                    }

                    factory.createDialogNode(dialog_node, conditions, nodeResponse, title)
						.then(() => {
							this.$store.dispatch("feedbacks/dialogNodes");
							this.newNodeName = "";
							this.ett = "";
							this.itt = "";
							this.addEntity = false;
							this.addIntent = false;
							this.nodeResponse = "";
							return this.createDialogModal = false;
						})
						.catch((err) => console.error(err));


				}
			},
			"computed": {
                getNodes() {
                	return this.$store.getters["feedbacks/getDialogNodes"];
                },
				trash() {
					return require("@fortawesome/fontawesome-free-solid/faTrashAlt");
				},
                getEntities() {
                	return this.$store.getters["feedbacks/getArrayOfEntities"];
                },
                getIntents() {
					return this.$store.getters["feedbacks/getArrayOfIntents"];
				},
                isFilled() {
                	if ((this.ett || this.itt)) {
						return true;
					} else {
                		return false;
                    }
                }
			},
			"beforeCreate": function () {
                this.$store.dispatch("feedbacks/dialogNodes");
				this.$store.dispatch("feedbacks/formatedEntities");
				this.$store.dispatch("feedbacks/formatedIntents");
			}
		}

	}());
</script>
<style>
    .node-title {
        font-size: 18px;
        font-weight: bold;
        color: #545252;
    }

    .node-conditions {
        font-size: 14px;
        font-weight: bold;
        color: darkgray;
    }
</style>