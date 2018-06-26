<template>
    <div id="app">
        <div id="body-left">
            <div>
                <img src="../../../etc/img/Cloud.svg" />
            </div>
        </div>
        <div id="body-right">
            <div id="form-container">
                <div id="app-name">
                    <h1>Sophia Smart Assistant</h1>
                </div>
                <login-form></login-form>
            </div>
        </div>
    </div>
</template>

<script>
(function () {
    "use strict";
    module.exports = {
        "props": [],
        "name": "LoginModule",
        "components": {
            "loginForm": require("./loginForm.vue")
        },
        "data": function () {
            return {

            }
        },
        "methods": {
        }
    };

}());
</script>

<style>
    #app {
        display: flex;
        height: 100%;
        width: 100%;
    }

    #app-name h1{
        font-size: 2em;
        padding-bottom: 30px;
    }

    #body-left {
        background-color: darkslateblue;
        align-items: center;
        align-content: center;
        display: flex;
        justify-content: space-around;
        width: 50%;
    }

    #body-right {
        height: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-flow: column;
        width: 50%;
    }

    #form-btn {
        background-color: darkslateblue;
        color: white;
    }

    #form-container {
        display: flex;
        flex-flow: column;
        align-items: center;
    }

    @media screen and (max-width: 650px) {
        #app {
            flex-direction: column;
        }

        #body-left {
            width: 100%;
        }

        #body-right {
            width: 100%;
        }

        img {
            height: 250px;
        }
    }


</style>