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
                    <div class="intent-examples">
                        <h2 class="intent-title"> Valor </h2>
                        <div class="values-container">
                            <div v-for="value in entity.values">
                                <div>
                                    <span class="synonyms">{{ value.value }}</span>
                                </div>
                                <h2 class="intent-title"> Sinônimos </h2>
                                <div id="syn-container" v-if="value.synonyms.length > 0">
                                    <div  v-for="synonym in value.synonyms">
                                        <span class="synonyms"> {{synonym}} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>

                    </div>
                </div>
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
                    <button class="button is-danger" @click="">Cofirmar</button>
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
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Valor</label>
                                        <div class="entity-menu">
                                            <input class="input" type="email" placeholder="O que esta entidade representa ?" v-model="entityValue">
                                            <a class="button is-primary" @click="arrayOfValues()">
                                                Salvar e adicionar outro valor
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="entity-values-list" v-if="values.length > 0">
                                <div class="field is-grouped is-grouped-multiline">
                                    <div class="control" v-for="value in values">
                                        <div class="tags has-addons">
                                            <span class="tag is-link">{{value.value}}</span>
                                            <a class="tag is-delete" @click="popValue(value)"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-primary" :disabled='entityToCreate === ""' @click="createEntity(entityToCreate, values)">Cofirmar</button>
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
                    "entityToDelete": "",
                    "entityToCreate": "",
                    "entityValue": "",
                    "values": [],
                    "synonym": "",
                    "newSynonyms": [],
                    "newValue": ""
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
				createEntity(entityName, entityValues) {
					factory.createEntity(entityName, entityValues)
						.then(() => {
							this.createEntityModal = false;
							this.values = [];
							this.$store.dispatch("feedbacks/entities");
						})
						.catch(err => console.log(err));
				},
                callValue() {
					this.addValueModal = true;
                },
                addValue(entity) {
                    factory.createValue(entity, this.newValue)
                        .then(() => {
                        	this.addValueModal = false;
                        	this.newValue = "";
                        	this.$store.dispatch("feedbacks/entities");
                        })
                        .catch(err => console.error(err));
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

    .add-value {

    }
</style>
