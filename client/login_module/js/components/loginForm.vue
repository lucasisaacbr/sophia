<template>
    <div>
        <p v-if="confirmEmail"><strong>Email: </strong> {{ email }} </p>
        <div v-if="!confirmEmail" class="form-input">
            <div class="helper-txt">
                <span>Entre com seu email</span>
            </div>
            <input @keyup.enter="setEmail" type="text" class="form-field" v-model="inputEmail"/>
            <div class="btn-container">
                <button @click="setEmail">Enviar</button>
                <button>Registrar</button>
            </div>
        </div>

        <div v-if="confirmEmail" class="form-input">
            <div class="helper-txt">
                <span>Senha</span>
            </div>
            <input type="password" class="form-field" />
            <div class="btn-cotainer">
                <button @click="login">Enviar</button>
            </div>
        </div>

    </div>
</template>

<script>
    (function () {
        "use strict";

        module.exports = {
        	"props": [],
            "name": "LoginForm",
            "data": function () {
                return {
                	"inputEmail": "",
                	"email": "",
                    "confirmEmail": false
                }
			},
            "methods": {

        		"setEmail": function () {
        			this.email = this.inputEmail;
                    this.toggleEmail();
				},
                "toggleEmail": function () {
                    this.confirmEmail = !this.confirmEmail;
				},
                "login": function () {

				}
            }
        }

	}());
</script>

<style>
    .form-input {
        width: 320px;
    }
    .helper-txt {
        font-size: 0.7em;
        padding: 3.5px 0;
    }

    .form-field {
        width: 100%;
        padding: 2.5px;
    }
    .btn-container {
        padding: 5px 0;
    }

    .btn-container button {
        height: 23px;
        width: 65.5px;
        font-weight: 600;
        border-radius: 5px;
    }

    .btn-container button:first-child {

        background-color: cornflowerblue;
        color: white;
    }

    .btn-container button:nth-child(2) {
        color: slategray;
        background-color: white;
    }
</style>