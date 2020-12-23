<template>
	<div id="panier" :class="{popup:true, active:visible}"  @click="visible=false">
		<div class="popup-body" @click.prevent.stop>
			<table class="table panier">
				<caption class="header-panier">Panier</caption>
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
			<div class="btns-valider">
				<button style="margin-right:3px"id="valider-panier"
					@click="validerCommande">
					valider
				</button>
				<button id="valider_imprimer">valider et imprimer</button>
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
		}
	},
	methods: {
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
			for(var i = 0; i < this.cart.length; i++){
				let cart_item = this.cart[i];
				let commande = {
					"tel": "",
					"date": new Date().toISOString().slice(0,10),
					"a_payer": cart_item.recette.prix*cart_item.quantite,
					"payee": cart_item.recette.prix*cart_item.quantite,
					"reste": 0,
					"table": this.$store.state.selected_table.id,
					"serveur": this.$store.state.selected_serveur.id,
					"personnel": this.$store.state.user.id
				};
				// axios.post(
				// 	this.$store.state.host+"/commande/",
				// 	commande, headers
				// ).then((response) => {
				// 	this.$store.state.commandes.unshift(response.data);
				// }).catch((error) => {
				// console.error(error);
				// });
			}
		}
	}
};
</script>
<style scoped>
.popup{
	position: fixed;
	background-color: rgb(0,0,0,0.5);
	top:0;
	left:0;
	width: 100%;
	height: 100%;
	visibility: hidden;
	overflow-y: scroll;
	z-index: 3;
}
.popup.active{
	visibility: visible;
}
.popup-body{
	position: absolute;
	border-radius: 5px;
	top:30%;
	left:50%;
	transform: translate(-50%, -30%);
	background-color: white;
	opacity: 1;
	padding: 5px;
}
.header-panier{
	font-size: 1.5em;
	margin: 2px;
	font-weight: bold;
	text-align:  center;
}
</style>