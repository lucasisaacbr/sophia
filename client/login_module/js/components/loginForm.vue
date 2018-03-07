<template>
    <div>
        <p v-if="confirmEmail"><strong>Email: </strong> {{ email }} </p>
        <div v-if="!confirmEmail" class="form-input">
            <div>
                <span>Entre com seu email</span>
            </div>
            <input type="text" v-model="inputEmail"/>
        </div>

        <div v-if="confirmEmail" class="form-input">
            <span>Senha</span>
            <input type="password" />
        </div>

        <div>
            <button @click="setEmail">Confirm</button>
            <button>Register</button>
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
				}
            }
        }

	}());
</script>