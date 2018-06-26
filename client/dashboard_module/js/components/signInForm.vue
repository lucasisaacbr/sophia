<template>
    <div>
        <div class="sh-content-container">
            <div class="intent-header">
                <h2 id="intent-header-title">Cadastro de Usuário</h2>
                {{userObj}}
            </div>
            <div class="card-container">
                <div class="sh-card">
                    <div class="field is-horizontal">
                        <div class="field is-horizontal">
                            <div class="field-label is-normal">
                                <label class="label">email</label>
                                <input class="input" type="text" v-model="user.email" placeholder="email do usuário">
                            </div>
                            <div class="field-label is-normal">
                                <div class="field">
                                    <div class="control">
                                        <label class="label">Perfil</label>
                                        <div class="select is-primary">
                                            <select v-model="user.perfil">
                                                <option disabled value="">Escolha um item</option>
                                                <option>Cliente</option>
                                                <option>SME</option>
                                                <option v-if="userObj.admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal">
                                    <label class="label">senha</label>
                                    <input class="input" type="password" placeholder="Digite a senha" v-model="user.password">
                                </div>
                            </div>
                        </div>
                        <footer class="modal-card-foot"
                                style="background-color: white">
                            <button class="button is-primary"
                                    :disabled='(user.email === "" || user.password === "" || perfil === "")'
                                    @click="createDialog()">
                                Cofirmar
                            </button>
                        </footer>
                    </div>
                </div>
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
        "name": "PositiveContent",
        "data": function () {
            return {
                "user": {
                    "email": "",
                    "password": "",
                    "perfil": ""
                }
            }
        },
        "methods": {

        },
        "computed": {
        	userObj() {
				return this.$store.getters["user/getUser"];
			}
        },
		"beforeCreate": function () {
			this.$store.dispatch("user/getUserObj");
		}
    }
}());
</script>