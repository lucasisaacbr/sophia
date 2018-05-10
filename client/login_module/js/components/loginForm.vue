<template>
    <div>

        <transition name="fade">
            <span v-if="loginFail" id="alert-message"> Username or password invalid !</span>
        </transition>
        <p v-if="confirmEmail"><strong>Email: </strong> {{ credentials.email }} </p>

        <template v-if="!confirmEmail">
            <div class="form-input" :key="'um'">
                <div class="helper-txt">
                    <span>Entre com seu email</span>
                </div>
                <input @keyup.enter="setEmail" type="text" class="input is-info form-field" v-model="inputEmail"/>
                <div class="btn-container">
                    <a class="button is-outlined is-small is-info" @click="setEmail">Enviar</a>
                    <a class="button is-outlined is-small is-primary" @click="">Registrar</a>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="form-input" :key="'dois'">
                <div class="helper-txt">
                    <span>Senha</span>
                </div>
                <input @keyup.entenr="login" type="password" class="input is-info form-field" v-model="credentials.password"/>
                <div class="btn-container">
                    <a class="button is-outlined is-small is-danger" @click="confirmEmail = false">Corrigir e-mail</a>
                    <a :class="{'is-loading': isLoading }" class="button is-outlined is-small is-primary" @click="login">Enviar</a>
                </div>
            </div>
        </template>


    </div>
</template>

<script>
    (function () {
        "use strict";

        let factory = require("../factory/factory");
        module.exports = {
        	"props": [],
            "name": "LoginForm",
            "data": function () {
                return {
                	"inputEmail": "",
                	"credentials": {
                		"email": "",
                        "password": ""
                    },
                    "confirmEmail": false,
                    "loginFail": false,
                    "isLoading": false
                }
			},
            "methods": {

        		"setEmail": function () {
        			this.credentials.email = this.inputEmail;
                    this.toggleEmail();
                    this.loginFail = false;
				},
                "toggleEmail": function () {
                    this.confirmEmail = !this.confirmEmail;
				},
                "login": function () {
        			this.isLoading = true;
        			factory.login(this.credentials.email, this.credentials.password).then(x => {
        				this.$store.dispatch("user/getUserName");
        				this.loginFail = false;
        				this.isLoading = false;
        				location.replace("/chat");
                    }).catch(x => {
                    	console.error(x);
                    	this.loginFail = true;
						this.isLoading = false;
                    });
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
         display: flex;
         justify-content: flex-end;
         padding: 5px 0;
     }

    .btn-container a {
        margin-left: 7px;
    }


    .is-info {
        border-color: cornflowerblue !important;
    }

    .is-primary {
        border-color: darkslateblue !important;
        color: darkslateblue !important;
    }

    .is-primary:hover {
        background-color: darkslateblue !important;
        color: white !important;
    }

    #alert-message {
        color: #8b0c11;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
        opacity: 0;
    }


    @media screen and (max-width: 650px) {
        
    }

</style>