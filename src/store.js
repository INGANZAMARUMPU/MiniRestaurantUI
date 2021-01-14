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
		stats:{ menu:[], service:[]},
		stocks : [],
		host:"http://127.0.0.1:8000",
		selected_serveur: null,
		selected_table: null,
		cart : new Object({
			content: [],
			getTotal(){
				let tot = 0;
				for (let i = 0; i < this.content.length; i++) {
					tot += this.content[i].getTotal();
				}
				return tot;
			},
			getLength(){
				return this.content.length
			},
			find(recette_id){
				for (let i = 0; i < this.content.length; i++) {
					let item = this.content[i];
					if (item.recette.id == recette_id) {
						return i;
					}
				}
				return -1;
			},
			getQuantite(recette_id){
				let position = this.find(recette_id);
				if(position>=0){
					return this.content[position].quantite;
				}
				return 0;
			},
			increase(recette_id){
				let position = this.find(recette_id);
				if(position>=0){
					this.content[position].quantite++;
				}
			},
			decrease(recette_id){
				let position = this.find(recette_id);
				if(position>=0){
					let item = this.content[position];
					if(item.quantite>0){
						item.quantite--;
					} else {
						this.content.splice(position, 1)
					}
				}
			},
			add(item){
				let position = this.find(item.id);
				if(position>=0){
					this.increase(item.id)
				} else {
					let ikintu = new Object({
						recette: item,
						quantite : 1, 
						getTotal(){
							return this.recette.prix*this.quantite
						}
					});
					this.content.push(ikintu);
				}
			},
		})
	},
	mutations: {},
	actions: {},
	getters:{},
})