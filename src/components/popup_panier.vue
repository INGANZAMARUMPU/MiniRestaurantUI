<template>
	<div id="panier" :class="{popup:true, active:visible}"  @click="close">
		<div class="popup-body" @click.prevent.stop>
			<table class="table panier">
				<caption class="title">Panier</caption>
				<thead>
					<tr>
						<th>Name</th>
						<th>price</th>
						<th>quantity</th>
						<th>total</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody class=".popup-content">
					<tr v-for="item in cart.content" v-if="item.quantite>0">
						<td>{{item.recette.nom}}</td>
						<td>{{item.recette.prix}}</td>
						<td>{{item.quantite}}</td>
						<td>{{item.getTotal()}}</td>
						<td><button class="panier_moins" @click="decreaseQtt(item)">-</button></td>
						<td><button class="panier_plus" @click="increaseQtt(item)">+</button></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>total</td>
						<td></td>
						<td></td>
						<td>{{ cart.getTotal() }}</td>
						<td></td>
						<td></td>
					</tr>
				</tfoot>
			</table>
			<form v-if="dette_enabled">
				<div class="field">
					<label for="">nom</label>
					<input type="text" name="">
				</div>
				<div class="field">
					<label for="">Telephone</label>
					<input type="text" name="">
				</div>
			</form>
			<label style="color:red" v-if="erreur!=''">{{ erreur }}</label>
			<div class="btns">
				<button @click="dette_enabled=true">dette</button>
				<button>valider</button>
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
			cart : this.$store.state.cart,
			erreur : "", dette_enabled:false,
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
				"personnel": this.$store.state.user.id
			};
			axios.post(
				this.$store.state.host+"/commande/",
					commande, headers
				).then((response) => {
					commande = response.data;
					for(var i = 0; i < this.cart.getLength(); i++){
						let item = this.cart.content[i];
						let details_commande = {
							"commande": commande.id,
							"recette": item.recette.id,
							"quantite": item.quantite
						};
						axios.post(
							this.$store.state.host+"/detail_commande/",
							details_commande, headers
						).then((response) => {
							details_commande = response.data;
							commande.details.push(details_commande);
							commande.a_payer += details_commande.somme;
							this.$store.state.cart.content = []
							this.$emit("close", null);
							this.erreur = "";
						}).catch((error) => {
							this.erreur = error;
							return;
						});
					}
					this.$store.state.commandes.unshift(commande);
				}).catch((error) => {
					console.error(error);
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