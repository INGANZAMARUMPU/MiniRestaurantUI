import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state:{
		user : null,
		serveurs : [],
		recettes : [],
		tables : [],
		commandes : [],
		stocks : [],
		host:"http://127.0.0.1:8000",
		selected_serveur: null,
		selected_table: null
	},
	mutations: {},
	actions: {},
	getters:{
    }
})