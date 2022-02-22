<template>
	<div id="panier" :class="{popup:true, active:visible}">
		<div class="popup-body" @click.prevent.stop>
			<table class="table panier">
				<caption class="title">Panier</caption>
				<button @click="close" class="close">&times</button>
				<thead>
					<tr>
						<th>Name</th><th>price</th>
						<th>quantity</th><th>total</th>
						<th></th><th></th>
					</tr>
				</thead>
				<tbody class=".popup-content">
					<tr v-for="item in cart.content" v-if="item.quantite>0">
						<td>{{item.recette.nom}}</td>
						<td>{{item.recette.prix}}</td>
						<td>x {{item.quantite}}</td>
						<td>{{money(item.getTotal())}}</td>
						<td><button class="panier_moins" @click="decreaseQtt(item)">-</button></td>
						<td><button class="panier_plus" @click="increaseQtt(item)">+</button></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>total</td><td></td><td></td>
						<td>{{ money(cart.getTotal()) }}</td>
						<td></td><td></td>
					</tr>
				</tfoot>
			</table>
			<label style="color:red" v-if="!!logs">{{ logs }}</label>
			<div class="btns">
				<button @click="validerCommande">Vendre</button>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	props: {
		visible:{ type:Boolean, default:false}
	},
	data () {
		return {
			cart : this.$store.state.cart, logs:"",
			dette_enabled:false, client:{}
		}
	},
	methods: {
		close(){
			this.$emit("close");
		},
		increaseQtt : function(item){
			this.cart.add(item.recette);
		},
		decreaseQtt : function(item){
			this.cart.decrease(item.recette.id);
		},
		validerCommande(){
			let headers = {
				headers: {
				"Authorization": "Bearer " + this.$store.state.user.access
				}
			}
			// let date = new Date().toISOString().slice(0,10);
			let commande = {
				"table": this.$store.state.selected_table.id,
				"serveur": this.$store.state.selected_serveur.id,
				"items":[],
				"reste":this.cart.getTotal(), "payee":0
			};
			for(var i = 0; i < this.cart.getLength(); i++){
				let item = this.cart.content[i];
				let details_commande = {
					"recette": item.recette.id,
					"quantite": item.quantite,
					"somme": item.getTotal()
				};
				commande.items.push(details_commande);
			}
			axios.post(this.$store.state.host+"/commande/",commande,headers)
			.then((response) => {
				this.$store.state.commandes.unshift(response.data);
				let produit = null;
				this.$store.state.cart.content.forEach((x, i) => {
					if(!!x.recette.produit){
						produit = this.$store.state.stocks.find(
							p => p.id == x.recette.produit
						)
						if(!!produit){
							produit.quantite -= x.quantite;
						}
						produit = null
					}
				})
				this.$store.state.cart.content=[];
				this.close();
			}).catch((error) => {
				if (!!error.response) {
					this.logs = error.response.data.status
				} else {
					console.error(error)
					this.logs = "une erreur est survenue";
				}
			});
		}
	}
};
</script>
<style scoped>
.btns {
	display: flex;
	justify-content: flex-end;
}
.field{
	display: inline-block;
	width: 49%;
}
</style>