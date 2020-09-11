import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes'

Vue.use(VueRouter);
const router = new VueRouter({ routes, mode: 'history'})

export const EVENT_BUS = new Vue({
	data: {
		serveurs:[],
		tables:[],
		recettes:[],
		user:null
	},
	methods: {
		getServeur: function(id){
			for (let serveur of this.serveurs) {
				if (serveur.id == id) {
					return serveur;
				}
			}
		},
		getTable: function(id){
			for (let table of this.tables) {
				if (table.id == id) {
					return table;
				}
			}
		}
	}
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
