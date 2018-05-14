(function () {
	"use strict";
	/**
	 * Watson Assistant helper/wrapper
	 * @module watsonConversation
	 * */
	const Assistant = require("watson-developer-cloud").AssistantV1;
	const serviceUrl = "https://gateway.watsonplatform.net/assistant/api";
	const versionDate = "2018-02-16";
	const createError = require("http-errors");

	module.exports = {
		/**
		 * Authenticate the user creating a new Assistant instance.
		 * @method
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @return {Promise} Authentication object.
		 */
		"authenticate": function (credentials = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				process.nextTick(() => {
					resolve(new Assistant({
						"username": credentials.username,
						"password": credentials.password,
						"url": serviceUrl,
						"version": versionDate
					}));
				});
			});
		},
		/**
		 * List all workspaces from a Assistant Instance.
		 * @method
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @return {Promise} Workspaces array of object.
		 */
		"listWorkspaces": function (credentials = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.listWorkspaces({
						"page_limit": "",
						"include_count": "",
						"sort": "",
						"cursor": ""
					}, function (err, result) {
						return err ? reject(err) : resolve(result);
					});
				});
			});
		},
		/**
		 * Create a new workspace for the Assistant Instance.
		 * @method
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace .
		 * @param {string} payload.name - The name of the workspace.
		 * @param {string} [payload.description] - The description of workspace.
		 * @param {string} [payload.language] - The language of workspace.
		 * @param {string} payload.metadata - The metadata related to the workspace.
		 * @param {Array} payload.entities - An array of objects defining the entities for the workspace..
		 * @param {Array} payload.intents - An array of objects defining the intents for the workspace.
		 * @param {Array} payload.dialog_nodes - An array of objects defining the nodes in the workspace dialog.
		 * @param {Array} payload.counterexamples -An array of objects defining input examples that have been marked as irrelevant input.
		 * @return {Promise} Workspace object.
		 */
		"createWorkspace": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.createWorkspace(payload, (err, response) => {
						if (err) {
							return reject(createError(500, "Workspace could not be created"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Delete a workspace from the Assistant Instance.
		 * @method
		 * @param {object} credentials - Contains username and password .
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Conversation instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @return {Promise} Deleted workspace object.
		 */
		"deleteWorkspace": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id) {
					return reject(createError(400, "Can not proceed without the workspace_id"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.deleteWorkspace(payload, (err, response) => {
						if (err) {
							reject(createError(500, "This workspace could not be deleted"));
						} else {
							return resolve(response);
						}
					});
				})
			})
		},
		/**
		 * Get a workspace from the Conversation Instance.
		 * @method
		 * @param {object} credentials - Contains username and password
		 * @param {string} credentials.username - username for Conversation instance
		 * @param {string} credentials.password - password for Conversation instance
		 * @param {object} payload - Contains data to feed a new workspace
		 * @param {string} payload.workspace_id - Unique identifier of a workspace
		 * @param {boolean} [payload.export] - Whether to include all element content in the returned data. If export=false, the returned data includes only information about the element itself. If export=true, all content, including subelements, is included. The default value is false.
		 * @param {boolean} [payload.include_audit] - Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Workspace object.
		 */
		"getWorkspace": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.getWorkspace(payload, (err, response) => {
						if (err) {
							reject(createError(500, "This workspace could not be fetch"));
						} else {
							return resolve(response);
						}
					});
				})
			});
		},
		/**
		 * Update a workspace from Conversation Instance.
		 * @method
		 * @param {object} credentials - Contains username and password
		 * @param {string} credentials.username - username for Conversation instance.
		 * @param {string} credentials.password - password for Conversation instance.
		 * @param {object} payload - Contains data to feed a new workspace
		 * @param {string} payload.workspace_id - Unique identifier of a workspace
		 * @param {string} payload.name - The name of the workspace.
		 * @param {string} payload.description - The description of workspace.
		 * @param {string} payload.language - The language of workspace.
		 * @param {string} payload.metadata - The metadata related to the workspace.
		 * @param {Array} payload.entities - An array of objects defining the entities for the workspace..
		 * @param {Array} payload.intents - An array of objects defining the intents for the workspace.
		 * @param {Array} payload.dialog_nodes - An array of objects defining the nodes in the workspace dialog.
		 * @param {Array} payload.counterexamples - An array of objects defining input examples that have been marked as irrelevant input.
		 * @return {Promise} Updated workspace object.
		 */
		"updateWorkspace": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id) {
					return reject(createError(400, "Can not proceed without the workspace_id"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.updateWorkspace(payload, (err, response) => {
						if (err) {
							reject(createError(500, "This workspace could not be updated"));
						} else {
							return resolve(response);
						}
					});
				})
			});
		},
		/**
		 * Get a response to a user's input.
		 * @method
		 * @param {object} credentials - Contains username and password
		 * @param {string} credentials.username - username for Conversation instance
		 * @param {string} credentials.password - password for Conversation instance
		 * @param {object} payload - Contains data to feed a new workspace
		 * @param {string} payload.workspace_id - Unique identifier of a workspace
		 * @param {object} payload.input - The user input
		 * @param {string} payload.input.text - The text user input.
		 * @param {boolean} [payload.alternate_intents] - Whether to return more than one intent. Default is false. Set to true to return all matching intents
		 * @param {object} payload.context - State information for the conversation.
		 * @param {string} payload.context.conversation_id - The unique identifier of the Assistant.
		 * @return {Promise} Response object.
		 */
		"sendMessage": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id) {
					return reject(createError(400, "Can not proceed without the workspace_id"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.message(payload, (err, response) => {
						if (err) {
							reject(createError(500, "This message could not be delivered"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * List the counterexamples for a workspace. Counterexamples are examples that have been marked as irrelevant input.
		 * @method
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {number} payload.page_limit - The number of records to return in each page of results. The default page limit is 100.
		 * @param {boolean} payload.include_count - Whether to include information about the number of records returned.
		 * @param {string} payload.sort - The attribute by which returned results will be sorted.
		 * @param {string} payload.cursor - A token identifying the last object from the previous page of results.
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Counter example array of objects.
		 */
		"listCounterExamples": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id) {
					return reject(createError(400, "Can not proceed without the workspace_id"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.listCounterexamples(payload, (err, response) => {
						if (err) {
							reject(createError(500, "There is a problem to list counterexamples"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Add a new counterexample to a workspace.
		 * @method
		 * @param {object} credentials - Contains username and password .
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.text - The text of a user input example to be marked as irrelevant input.
		 * @return {Promise} The new Counterexample object.
		 */
		"createCounterExample": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id || !payload.text) {
					return reject(createError(400, "Can not proceed without the workspace_id or text properties"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.createCounterExample(payload, (err, response) => {
						if (err) {
							reject(createError(500, "A counterexample could not be created"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Delete a counterexample from a workspace.
		 * @param {object} credentials - Contains username and password .
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.text - The text of a user input example to be marked as irrelevant input.
		 * @return {Promise} Deleted Counterexample object.
		 */
		"deleteCounterExample": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id || !payload.text) {
					return reject(createError(400, "Can not proceed without the workspace_id or text properties"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.deleteCounterExample(payload, (err, response) => {
						if (err) {
							reject(createError(500, "A counterexample could not be deleted"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Get information about a counterexample from a workspace.
		 * @param {object} credentials - Contains username and password .
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.text - The text of a user input example to be marked as irrelevant input.
		 * @return {Promise} Containing the information of counterexample.
		 */
		"getCounterExample": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {

				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id || !payload.text) {
					return reject(createError(400, "Can not proceed without the workspace_id or text properties"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.getCounterExample(payload, (err, response) => {
						if (err) {
							reject(createError(500, "A counterexample could not fetched"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Update information about a counterexample from a workspace.
		 * @param {object} credentials - Contains username and password .
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.text - The text of a user input example to be marked as irrelevant input. .
		 * @param {string} payload.new_text - The updated text for the counterexample.
		 * @return {Promise} Containing the result of updated Counterexample.
		 */
		"updateCounterExample": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id || !payload.text || !payload.new_text) {
					return reject(createError(400, "Can not proceed without the workspace_id, text or new_text properties"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.updateCounterExample(payload, (err, response) => {
						if (err) {
							reject(createError(500, "A counterexample could not updated"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * List the entities for a workspace.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {boolean} payload.export -Whether to include all element content in the returned data.
		 * @param {number} payload.page_limit - The number of records to return in each page of results. The default page limit is 100.
		 * @param {boolean} payload.include_count - Whether to include information about the number of records returned.
		 * @param {string} payload.sort - The attribute by which returned results will be sorted.
		 * @param {string} payload.cursor - A token identifying the last object from the previous page of results.
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Containing the array of entities object.
		 */
		"listEntities": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id) {
					return reject(createError(400, "Can not proceed without the workspace_id"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.listEntities(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The entities could not be listed"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Create a new entity.
		 * @param {object} credentials - Contains username and password .
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.entity - The name of the entity. .
		 * @param {string} payload.description - The description of the entity.
		 * @param {object} payload.metadata - Any metadata related to the entity.
		 * @param {boolean} payload.fuzzy_match	 - Whether to use fuzzy matching for the entity.
		 * @param {Array}  payload.values - An array of entity values.
		 * @return {Promise} Containing the result of new entity.
		 */
		"createEntity": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id || !payload.entity) {
					return reject(createError(400, "Can not proceed without the workspace_id or a entity name"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.createEntity(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The entities could not be created"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Delete an entity from a workspace.
		 * @param {object} credentials - Contains username and password .
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.entity - The name of the entity.
		 * @return {Promise} Containing the result of deleted entity object.
		 */
		"deleteEntity": function (credentials = {}, payload = {}) {
			/**
			 * Delete an entity from a workspace.
			 * @param {object} credentials - Contains username and password .
			 * @param {string} credentials.username - username for Assistant instance.
			 * @param {string} credentials.password - password for Assistant instance.
			 * @param {object} payload - Contains data to feed a new workspace.
			 * @param {string} payload.workspace_id - Unique identifier of a workspace.
			 * @param {string} payload.entity - The name of the entity. .
			 */
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id || !payload.entity) {
					return reject(createError(400, "Can not proceed without the workspace_id or a entity name"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.deleteEntity(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The entities could not be deleted"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Get information about an entity, optionally including all entity content.
		 * @param {object} credentials - Contains username and password .
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.entity - The name of the entity..
		 * @param {boolean} payload.export - Whether to include all element content in the returned data.
		 * @param {boolean} payload.include_audit -TWhether to include the audit properties.
		 * @return {Promise} Containing the result of entity object.
		 */
		"getEntity": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id || !payload.entity) {
					return reject(createError(400, "Can not proceed without the workspace_id or a entity name"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.getValue(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The entities could not be fetched"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Update an existing entity with new or modified data. You must provide JSON data defining the content of the updated entity.
		 * @param {object} credentials - Contains username and password .
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.entity - The text of a user input example to be marked as irrelevant input. .
		 * @param {string} payload.new_entity - The updated name of the entity..
		 * @param {string} payload.new_description - he updated description of the entity.
		 * @param {object} payload.new_metadata - Updated metadata related to the entity.
		 * @param {boolean} payload.new_fuzzy_match - Whether to use fuzzy matching for the entity.
		 * @param {Array} payload.new_values - An array of entity values.
		 * @return {Promise} Containing the result of updated entity.
		 */
		"updateEntity": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				if (!payload.workspace_id || !payload.entity || !payload.new_entity) {
					return reject(createError(400, "Can not proceed without the workspace_id, entity and new_entity name"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.updateValue(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The entities could not be updated"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * List entity value synonyms.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.entity - The name of the entity..
		 * @param {string} payload.value - The text of the entity value..
		 * @param {number} payload.page_limit - The number of records to return in each page of results.
		 * @param {boolean} payload.include_count - Whether to include information about the number of records returned.
		 * @param {string} payload.sort - The attribute by which returned results will be sorted.
		 * @param {string} payload.cursor - A token identifying the last object from the previous page of results.
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Containing the array of synonyms object.
		 */
		"listSynonyms": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.listSynonyms(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The synonyms could not be listed"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Add a new synonym to an entity value.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.entity - The name of the entity..
		 * @param {string} payload.value - The text of the entity value..
		 * @param {string} payload.synonym - The new synonym.
		 * @return {Promise} Containing the result of new synonym.
		 */
		"createSynonym": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.createSynonym(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The synonym could not be created"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Delete a synonym from an entity value.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.entity - The name of the entity..
		 * @param {string} payload.value - The text of the entity value..
		 * @param {string} payload.synonym - The new synonym.
		 * @return {Promise} Containing the result of deleted synonym.
		 */
		"deleteSynonym": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.deleteSynonym(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The synonym could not be deleted"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Get information about a synonym of an entity value.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.entity - The name of the entity..
		 * @param {string} payload.value - The text of the entity value..
		 * @param {string} payload.synonym - The new synonym.
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Containing the result of given synonym.
		 */
		"getSynonym": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.getSynonym(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The synonym could not be fetched"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Update an existing entity value synonym with new text.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.entity - The name of the entity..
		 * @param {string} payload.value - The text of the entity value..
		 * @param {string} payload.synonym - The new synonym.
		 * @return {Promise} Containing the result of updated synonym.
		 */
		"updateSynonym": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.updateSynonym(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The synonym could not be updated"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * List the intents for a workspace.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {boolean} payload.export - Whether to include all element content in the returned data.
		 * @param {number} payload.page_limit - The number of records to return in each page of results.
		 * @param {boolean} payload.include_count - Whether to include information about the number of records returned.
		 * @param {string} payload.sort - The attribute by which returned results will be sorted.
		 * @param {string} payload.cursor - A token identifying the last object from the previous page of results.
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Containing the list of intents.
		 */
		"listIntents": function (credentials = {}, payload = {}) {
			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.listIntents(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The intents could not be listed"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Create a new intent.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {object} payload.body - The content of the new intent.
		 * @param {string} payload.intent -The name of the intent..
		 * @param {string} payload.description -The description of the intent.
		 * @param {Array} payload.examples - An array of user input examples for the intent.
		 * @return {Promise} Containing the resul of  new intent.
		 */
		"createIntent": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.createIntent(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The intent could not be created"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Create a new intent.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.intent -The name of the intent.
		 * @return {Promise} Containing the result of deleted intents.
		 */
		"deleteIntent": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.deleteIntent(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The intent could not be deleted"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Get information about an intent, optionally including all intent content.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {object} payload.body - The content of the new intent.
		 * @param {string} payload.intent -The name of the intent..
		 * @param {boolean} payload.export -  Whether to include all element content in the returned data.
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Containing the result of given intent.
		 */
		"getIntent": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.getIntent(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The intent could not be fetched"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Update an existing intent with new or modified data.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.intent -The name of the intent..
		 * @param {object} payload.body - The content of the new intent.
		 * @param {string} payload.body.intent -The name of the intent to be updated..
		 * @param {string} payload.body.description -The description of the intent.
		 * @param {Array} payload.body.examples - An array of user input examples for the intent.
		 * @return {Promise} Containing the result of updated intent.
		 */
		"updateIntent": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.updateIntent(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The intent could not be updated"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * List the user input examples for an intent.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {boolean} payload.intent - The intent name.
		 * @param {number} payload.page_limit - The number of records to return in each page of results.
		 * @param {boolean} payload.include_count - Whether to include information about the number of records returned.
		 * @param {string} payload.sort - The attribute by which returned results will be sorted.
		 * @param {string} payload.cursor - A token identifying the last object from the previous page of results.
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Containing the list of Examples.
		 */
		"listExamples": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.listExamples(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The examples could not be listed"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Add a new user input example to an intent.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.intent -The name of the intent..
		 * @param {object} payload.body - The content of the new intent.
		 * @param {string} payload.body.text - The text of a user input example.
		 * @return {Promise} Containing the result of  new Example.
		 */
		"createExample": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.createExample(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The example could not be created"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Delete a user input example from an intent.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.intent -The name of the intent..
		 * @param {string} payload.text - The text of a user input example..
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Containing the result of deleted Example.
		 */
		"deleteExample": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.deleteExample(payload, (err, response) => {
						if (err) {
							reject(createError(500, err));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Delete a user input example from an intent.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.intent -The name of the intent..
		 * @param {string} payload.text - The text of a user input example..
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Containing the result of given Example.
		 */
		"getExample": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.getExample(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The example could not be fetched"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Add a new user input example to an intent.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.intent -The name of the intent..
		 * @param {object} payload.body - The content of the new intent.
		 * @param {string} payload.body.text - The text of a user input example to be updated.
		 * @return {Promise} Containing the result of updated Example.
		 */
		"updateExample": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.updateExample(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The example could not be updated"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * List the user Dialog nodes.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {number} payload.page_limit - The number of records to return in each page of results.
		 * @param {boolean} payload.include_count - Whether to include information about the number of records returned.
		 * @param {string} payload.sort - The attribute by which returned results will be sorted.
		 * @param {string} payload.cursor - A token identifying the last object from the previous page of results.
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Containing the list of Dialog Nodes.
		 */
		"listDialogNodes": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.listDialogNodes(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The dialog nodes could not be listed"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Create a new Dialog Node.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {object} payload.properties - A CreateDialogNode object defining the content of the new dialog node.
		 * @param {object} payload.properties.dialog_node - The dialog node ID.
		 * @param {object} payload.properties.description - The description of the dialog node.
		 * @param {string} payload.properties.conditions - The condition that will trigger the dialog node.
		 * @param {string} payload.properties.parent - The ID of the parent dialog node.
		 * @param {string} payload.properties.previous_sibling - The ID of the previous dialog node.
		 * @param {object} payload.properties.output - The output of the dialog node.
		 * @param {object} payload.properties.context - The context for the dialog node.
		 * @param {object} payload.properties.metadata - The metadata for the dialog node.
		 * @param {function} payload.properties.next_step - The next step to be executed in dialog processing.
		 * @param {Array} payload.properties.actions - An array of objects describing any actions to be invoked by the dialog node.
		 * @param {Array} payload.properties.title - The alias used to identify the dialog node.
		 * @param {Array} payload.properties.node_type - HHow the dialog node is processed.
		 * @param {Array} payload.properties.event_name - How an event_handler node is processed.
		 * @param {Array} payload.properties.variable - The location in the dialog context where output is stored.
		 * @param {Array} payload.properties.digress_in - Whether this top-level dialog node can be digressed into.
		 * @param {Array} payload.properties.digress_out - Whether this top-level dialog node can be digressed into.
		 * @param {Array} payload.properties.digress_out_slots - Whether the user can digress to top-level nodes while filling out slots.
		 * @return {Promise} Containing the result of  new Dialog Node.
		 */
		"createDialogNode": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.createDialogNode(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The dialog nodes could not be created"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Delete a dialog node from a workspace.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.dialog_node - The dialog node ID (for example, get_order).
		 * @return {Promise} Containing the result of deleted DialogNode.
		 */
		"deleteDialogNode": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.deleteDialogNode(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The dialog nodes could not be deleted"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Get information about a dialog node.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.dialog_node - The dialog node ID (for example, get_order)..
		 * @param {boolean} payload.include_audit - Whether to include the audit properties (created and updated timestamps) in the response.z
		 * @return {Promise} Containing the result of given DialogNode.
		 */
		"getDialogNode": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.getDialogNode(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The dialog node could not be fetched"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * Update an existing dialog node with new or modified data.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {object} payload.properties - A CreateDialogNode object defining the content of the new dialog node.
		 * @param {object} payload.properties.dialog_node - The dialog node ID.
		 * @param {object} payload.properties.description - The description of the dialog node.
		 * @param {string} payload.properties.conditions - The condition that will trigger the dialog node.
		 * @param {string} payload.properties.parent - The ID of the parent dialog node.
		 * @param {string} payload.properties.previous_sibling - The ID of the previous dialog node.
		 * @param {object} payload.properties.output - The output of the dialog node.
		 * @param {object} payload.properties.context - The context for the dialog node.
		 * @param {object} payload.properties.metadata - The metadata for the dialog node.
		 * @param {function} payload.properties.next_step - The next step to be executed in dialog processing.
		 * @param {Array} payload.properties.actions - An array of objects describing any actions to be invoked by the dialog node.
		 * @param {Array} payload.properties.title - The alias used to identify the dialog node.
		 * @param {Array} payload.properties.node_type - HHow the dialog node is processed.
		 * @param {Array} payload.properties.event_name - How an event_handler node is processed.
		 * @param {Array} payload.properties.variable - The location in the dialog context where output is stored.
		 * @param {Array} payload.properties.digress_in - Whether this top-level dialog node can be digressed into.
		 * @param {Array} payload.properties.digress_out - Whether this top-level dialog node can be digressed into.
		 * @param {Array} payload.properties.digress_out_slots - Whether the user can digress to top-level nodes while filling out slots.
		 * @return {Promise} Containing the result of updated DialogNode.
		 */
		"updateDialogNode": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.updateDialogNode(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The dialog node could not be updated"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * List the events from the log of a specific workspace.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {number} payload.page_limit - The number of records to return in each page of results.
		 * @param {boolean} payload.include_count - Whether to include information about the number of records returned.
		 * @param {string} payload.sort - The attribute by which returned results will be sorted.
		 * @param {string} payload.filter - A cacheable parameter that limits the results to those matching the specified filter.
		 * @param {string} payload.cursor - A token identifying the last object from the previous page of results.
		 * @param {boolean} payload.include_audit -Whether to include the audit properties (created and updated timestamps) in the response.
		 * @return {Promise} Containing the list of Logs.
		 */
		"listLogs": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.updateDialogNode(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The logs could not be loaded"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		},
		/**
		 * List the events from the logs of all workspaces in the service instance.
		 * @param {object} credentials - Contains username and password.
		 * @param {string} credentials.username - username for Assistant instance.
		 * @param {string} credentials.password - password for Assistant instance.
		 * @param {object} payload - Contains data to feed a new workspace.
		 * @param {string} payload.workspace_id - Unique identifier of a workspace.
		 * @param {string} payload.filter -A cacheable parameter that limits the results to those matching the specified filter. You must specify a filter query that includes a value for language, as well as a value for workspace_id or request.context.metadata.deployment.
		 * @param {string} payload.sort - The attribute by which returned results will be sorted.
		 * @param {number} payload.page_limit - The number of records to return in each page of results.
		 * @param {string} payload.cursor - A token identifying the last object from the previous page of results.
		 * @return {Promise} Containingthe events from the logs of all workspaces in the service instance.
		 */
		"listAllLogs": function (credentials = {}, payload = {}) {

			return new Promise((resolve, reject) => {
				if (!credentials.username || !credentials.password) {
					return reject(createError(400, "Can not proceed without username and password"));
				}
				return this.authenticate(
					credentials
				).then(instance => {
					instance.listAllLogs(payload, (err, response) => {
						if (err) {
							reject(createError(500, "The logs could not be loaded"));
						} else {
							return resolve(response);
						}
					});
				});
			});
		}
	}
}());