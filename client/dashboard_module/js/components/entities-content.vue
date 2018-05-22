<template>
    <div class="sh-content-container">
        <div class="intent-header">
            <h2 id="intent-header-title">Entidades</h2>
            <a class="button is-primary" @click="createEntityModal = true">Adicionar Entidade</a>
        </div>
        <div
                v-for="entity in getEntities.entities"
                class="intent-container">
            <div class="intent-card">
                <div class="intent-card-content">
                    <div class="intent-name">
                        <h1><span class="intent-hash">@</span>{{ entity.entity }}
                            <span class="intent-delete">
                                   <a class="button is-danger is-small" @click="callDelete(entity.entity)">
                                 <font-awesome-icon
                                         :icon="trash">
                                </font-awesome-icon>
                            </a>
                            <a class="button is-primary is-small" @click="callValue(entity.entity)">
                                 <font-awesome-icon
                                         :icon="plusIcon">
                                 </font-awesome-icon> <span>{{" Novo Valor"}}</span>
                            </a>
                            </span>
                        </h1>
                    </div>
                    <hr/>
                    <div class="intent-examples values" v-for="value in entity.values" v-on:click="openEditValue(entity.entity, value.value)">
                        <div class="value-content" >
                            <h2 class="intent-title"> Valor: </h2>
                            <div class="values-container">
                                <div>
                                    <div>
                                        <span class="synonyms">{{ value.value }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="synonym-content" v-if="value.synonyms.length > 0">
                            <div class="syn-wrapper">
                                <h2 class="intent-title"> Sinônimos: </h2>
                                <div id="syn-container">
                                    <div v-for="synonym in value.synonyms" id="syn-items">
                                        <span class="syn-text"> {{ synonym }} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>

                    </div>
                </div>
            </div>
        </div>

        <div class="modal" :class="[{'is-active': editEntity}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editar valor <span class="has-text-danger">{{ toEdit.value }} </span> </p>
                    <button class="delete" aria-label="close" @click="closeEditValue()"></button>
                </header>
                <section class="modal-card-body intent-name">
                    <div class="value-delete">
                        <h3>Remover <span class="value-feature">{{ toEdit.value }}</span></h3>
                        <a class="button is-danger is-small" @click="deleteValue(toEdit.entity, toEdit.value)">
                            <font-awesome-icon
                                    :icon="trash">
                            </font-awesome-icon>
                        </a>
                    </div>
                    <div class="value-syn">
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">Sinônimos</label>
                                <div class="entity-menu">
                                    <input class="input" type="text" placeholder="Sinonimos" v-model="synonym">
                                    <a class="button is-primary" @click="addSynonym(toEdit.entity, toEdit.value)">
                                        Adicionar outro sinônimo
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="entity-values-list" v-if="newSynonyms.length > 0">
                            <div class="field is-grouped is-grouped-multiline">
                                <div class="control" v-for="syn in newSynonyms">
                                    <div class="tags has-addons">
                                        <span class="tag is-link">{{syn}}</span>
                                        <a class="tag is-delete" @click="popSynonym(syn)"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" @click="closeEditValue()">Cancelar</button>
                </footer>
            </div>
        </div>









        <div class="modal" :class="[{'is-active': showModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Deletar Entidade</p>
                    <button class="delete" aria-label="close" @click="showModal = false"></button>
                </header>
                <section class="modal-card-body intent-name">
                    Deseja realmente delelar a entidade <h1><span class="intent-hash">@</span>{{ entityToDelete }} ?
                </h1>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-danger" @click="deleteEntity(entityToDelete)">Cofirmar</button>
                    <button class="button" @click="showModal = false">Cancelar</button>
                </footer>
            </div>
        </div>

        <div class="modal" :class="[{'is-active': addValueModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Adicionar Valor e Sinônimos</p>
                    <button class="delete" aria-label="close" @click="addValueModal = false"></button>
                </header>
                <section class="modal-card-body intent-name">
                    <div>
                        <h1>Dica: O Valor é a representação de uma entidade </h1>
                        <h1>Ex: A entidade @pizza pode ter valores como calabresa e peperoni. </h1>
                        <div class="field is-horizontal">
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Valor</label>
                                    <input class="input" type="text" v-model="newValue" placeholder="Valor">
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Sinônimos</label>
                                        <div class="entity-menu">
                                            <input class="input" type="text" placeholder="Sinonimos" v-model="synonym">
                                            <a class="button is-primary" @click="arrayOfSynonyms()">
                                                Adicionar outro sinônimo
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="entity-values-list" v-if="newSynonyms.length > 0">
                                <div class="field is-grouped is-grouped-multiline">
                                    <div class="control" v-for="syn in newSynonyms">
                                        <div class="tags has-addons">
                                            <span class="tag is-link">{{syn}}</span>
                                            <a class="tag is-delete" @click="popSynonym(syn)"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-primary" @click="addValue(entitySelected, newValue, newSynonyms)">Cofirmar</button>
                    <button class="button" @click="addValueModal = false">Cancelar</button>
                </footer>
            </div>
        </div>


        <div class="modal" :class="[{'is-active': createEntityModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Adicionar Entidade</p>
                    <button class="delete" aria-label="close" @click="closeEntityModal()"></button>
                </header>
                <section class="modal-card-body intent-name">
                    <div>
                        <h1>Dica: Uma entidade representa o "o quê" da intenção </h1>
                        <h1>Ex: A entidade @saladeaula contém os valores de cada sala. T01, M13, etc... </h1>
                        <div class="field is-horizontal">
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">Nome da Entidade</label>
                                    <input class="input" type="text" v-model="entityToCreate" placeholder="Nome da Entidade">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-primary" :disabled='entityToCreate === ""' @click="createEntity(entityToCreate)">Cofirmar</button>
                    <button class="button" @click="closeEntityModal()">Cancelar</button>
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
			"name": "EntitiesContent",
			"data": function () {
				return {
					"showModal": false,
                    "createEntityModal": false,
                    "addValueModal": false,
                    "editEntity": false,
                    "entityToDelete": "",
                    "entityToCreate": "",
                    "entitySelected": "",
                    "entityValue": "",
                    "editValue": "",
                    "values": [],
                    "synonym": "",
                    "newSynonyms": [],
                    "newValue": "",
                    "toEdit": {
						"entity": "",
                        "value": "",
                        "new_synonyms": []
                    }
                }
			},
			"methods": {
				callDelete(entity) {
					this.showModal = true;
					this.entityToDelete = entity;
				},
                closeEntityModal() {
					this.createEntityModal = false;
					this.values = [];
                },
                arrayOfValues() {
					if ( this.entityValue ) {
						this.values.push({
							"value": this.entityValue
						});
						this.entityValue = "";
                    }
                },
                arrayOfSynonyms() {
					if ( this.synonym ) {
						this.newSynonyms.push(this.synonym);
                    }
                    this.synonym = "";
                },
                addSynonym(entity, value){
                    factory.addSynonym(entity, value, this.synonym)
						.then(() => {
							this.editEntity = false;
							this.$store.dispatch("feedbacks/entities");
							this.synonym = "";
						})
						.catch(err => console.log(err));
                },
                popValue(value) {
					let index = this.values.indexOf(value);
					if (index > -1) {
						this.values.splice(index, 1);
					}
                },
                popSynonym(syn) {
					let index = this.newSynonyms.indexOf(syn);
					if (index > -1) {
						this.newSynonyms.splice(index, 1);
                    }
                },
				deleteEntity(entityName) {
					factory.deleteEntity(entityName)
						.then(() => {
							this.showModal = false;
							this.$store.dispatch("feedbacks/entities");
						})
						.catch(err => console.log(err));
				},
				createEntity(entityName) {
					factory.createEntity(entityName)
						.then(() => {
							this.createEntityModal = false;
							this.values = [];
							this.$store.dispatch("feedbacks/entities");
						})
						.catch(err => console.log(err));
				},
                callValue(entity) {
					this.addValueModal = true;
					this.entitySelected = entity;
                },
                addValue(entity, value, synonyms) {
                    factory.createValue(entity, value, synonyms)
                        .then(() => {
                        	this.addValueModal = false;
                        	this.newSynonyms = [];
                        	this.newValue = "";
                        	this.$store.dispatch("feedbacks/entities");
                        })
                        .catch(err => console.error(err));
                },
                deleteSynonym(entity, value, synonym){
					factory.deleteSynonym(entity, value, synonym)
						.then(() => {
							this.$store.dispatch("feedbacks/entities");
						})
						.catch(err => console.error(err));
				},
                deleteValue(entity, value) {
				    factory.deleteValue(entity, value)
                        .then(() => {
                        	this.editEntity = false;
							this.$store.dispatch("feedbacks/entities");
                        });
                },
                openEditValue(entity, value){
					this.editEntity = true;
					this.toEdit.entity = entity;
					this.toEdit.value = value;
                },
                closeEditValue() {
					this.editEntity = false
					this.toEdit.entity = "";
					this.toEdit.value = "";
                }
			},
			"computed": {
				getEntities() {
					return this.$store.getters["feedbacks/getEntities"];
				},
				trash() {
					return require("@fortawesome/fontawesome-free-solid/faTrashAlt");
				},
                plusIcon() {
					return require("@fortawesome/fontawesome-free-solid/faPlus");
                }
			},
			"beforeCreate": function () {
				this.$store.dispatch("feedbacks/entities");
			}
		}

	}());
</script>

<style>
    .entity-menu {
        display: flex;
    }

    .values-container {
        display: flex;
        flex-direction: column;
    }

    #syn-container {
        display: flex;
    }
    .synonyms {
        padding: 7px;
    }

    #syn-items {
        margin: 7px;
    }

    .values {
        display: flex;
        flex-direction: column;
    }

    .values:hover {
        background: #d2d2d2;
        cursor: pointer;
        padding: 3.5px;
        border-radius: 3px;
    }

    .syn-wrapper {
        display: flex;
    }

    .value-content {
        display: flex;
        padding: 3.5px;
    }


    .intent-title {
        align-self: center;
    }

    .syn-text {
        color: darkslateblue;
    }

    .value-delete {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .value-feature {
        font-weight: lighter;
        font-size: 21px;
    }

</style>
