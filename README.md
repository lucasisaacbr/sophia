# Sophia - Construtor de Chatbots para IBM Watson Assistant

Este é um Trabalho de Conclusão de Módulo (TCM) para o curso de Análise e Desenvolvimento de Sistemas do centro universitário UniMetrocamp.

O projeto é dividido em três partes: 

1. Login de usuários ou administradores
2. O próprio chat onde ocorrerá a interação entre os clientes e o bot.
3. Um dashboard administrativo.

## Descrição do Dashboard

A função do dashboard é de acompanhar os feedbacks dos clientes e principalmente desenvolver o bot. Ele é totalmente integrado com o IBM Watson Assistant, desta forma o administrador conseguirá:

- Criar, deletar, editar Entidades
- Criar, deletar, editar Intenções
- Desenvolver novos fluxos de conversa através dos nós de diálogo.

Portanto essa ferramente tem por objetivo facilitar a criação de chat-bots com a integração do serviço IBM e a aplicação.


## Dependencias

 * [Node.JS v8.9.4+](https://nodejs.org/en/)
 * [Vue.js v2+](https://vuejs.org/)
 * [MongoDB v3.4](https://docs.mongodb.com/)
 * [Gulp v4.0](https://gulpjs.com/)
 * [ESLint](https://eslint.org)


## Configuração do banco de dados

O MongoDB deve ter 2 collections, são elas:

```
### Feedbacks

{
	"_id" : ObjectId("5af60fca60ade824f51e2b1c"),
	"user" : "x@hotmail.com",
	"intents" : [
		{
			"intent" : "greeting",
			"confidence" : 0.955219030380249
		}
	],
	"entities" : [
		{
			"entity" : "day",
			"location" : [
				7,
				10
			],
			"value" : "dia",
			"confidence" : 1
		}
	],
	"input" : {
		"text" : "oi bom dia"
	},
	"output" : [
		"Muito bom dia",
	],
	"date" : "2018-05-11T21:48:57.537Z",
	"positive" : true
}

```

```
### users

{
	"_id" : ObjectId("5adf9f427a41db29dcacc4b9"),
	"username" : "x@hotmail.com",
	"password" : "$2a$06$0bE3LbKOVvCbII6np9/zvOqfnQpZBiJqy6/kRgpAbMMG2PF10dj0.",
	"admin" : true
}
```
## Instalação
1. Clone o repositório `git@github.com:lucasisaacbr/sophia.git`
2. Entre na pasta clonada `cd sophia`
3. Crie o arquivo `.env`na pasta raiz do projeto 
   OBS: Para projetos em produção os valores das varáveis do .env devem ser variáveis de ambiente.

O .env deve conter as seguintes variáveis, sendo x seus valores:

```
APP_SECRET=x
LOCAL_HTTPS=x
ASSISTANT_USER=x
ASSISTANT_PASSWORD=x
ASSISTANT_WORKSPACE=x
MONGO_CONNECTION_STRING=x
```
4. Instalar as dependencias com `npm install`
5. Compilar e minificar dependencias com `gulp build-all`
6. Subir o servidor localmente com `node app.js`

