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
                            <span class="intent-delete" @click="callDelete(entity.entity)">
                                 <font-awesome-icon
                                         :icon="trash">
                                </font-awesome-icon>
                            </span>
                        </h1>
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


        <div class="modal" :class="[{'is-active': createEntityModal}]">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Adicionar Entidade</p>
                    <button class="delete" aria-label="close" @click="createEntityModal = false"></button>
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
                    <button class="button" @click="createEntityModal = false">Cancelar</button>
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
                    "entityToDelete": "",
                    "entityToCreate": "",
                    "entityValue": "",
                    "values": []
                }
			},
			"methods": {
				callDelete(entity) {
					this.showModal = true;
					this.entityToDelete = entity;
				},
                arrayOfValues() {
					if ( this.entityValue ) {
						this.values.push({
							"value": this.entityValue
						});
						this.entityValue = "";
                    }
                },
                popValue(value) {
					let index = this.values.indexOf(value);
					if (index > -1) {
						this.values.splice(index, 1);
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
					console.log("Values", entityValues);
					factory.createEntity(entityName, entityValues)
						.then(() => {
							this.createEntityModal = false;
							this.$store.dispatch("feedbacks/entities");
						})
						.catch(err => console.log(err));
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
</style>
