<template>
	<div id="panier" :class="{popup:true, active:visible}">
		<div class="popup-body" @click.prevent.stop v-if="!!commande">
			<table class="table panier">
				<caption class="title">Details Commande #{{commande.id}}</caption>
				<button @click="close" class="close">&times</button>
				<thead>
					<tr>
						<th>Name</th>
						<th>price</th>
						<th>quantity</th>
						<th>total</th>
						<th>option</th>
					</tr>
				</thead>
				<tbody class=".popup-content">
					<tr v-for="details in commande.details">
						<td>{{details.nom}}</td>
						<td class="money">{{money(details.prix)}}</td>
						<td>x {{details.quantite}}</td>
						<td class="money">{{money(details.somme)}}</td>
						<td>
							<button style="background-color: darkred;" @click="enlever(details)">
								enlever
							</button>
						</td>
					</tr>
					<tr v-for="details in commande.details">
						<td>
							<select v-model="added_menu">
								<option v-for="menu in $store.state.recettes" :value="menu">
									{{ menu.nom }}
								</option>
							</select>
						</td>
						<td class="money">{{ money(added_menu.prix)}}</td>
						<td>x<input type="number" v-model="added_qtt"></td>
						<td class="money">{{ money(added_menu.prix)}}</td>
						<td>
							<button @click="ajouter">ajouter</button>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>total</td>
						<td></td>
						<td></td>
						<td class="money">{{ money(commande.a_payer) }}</td>
					</tr>
				</tfoot>
			</table>
			<div class="btns-valider">
				<button style="margin-right:3px"vid="valider-panier" @click="supprimer">
					supprimer
				</button>
				<button @click="imprimer">
					imprimer
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	props: {
		visible:{ type:Boolean, default:false},
		commande:{ type:Object, default:null}
	},
	data(){
		return {
			added_menu:{}, added_qtt:1
		}
	},
	methods: {
		close(){
			this.$emit("close")
		},
		imprimer(){
			window.print()
		},
		supprimer(){
			if(!confirm("Voulez-vous vraiment supprimer?")){
				return
			}
			axios.delete(this.host+`/commande/${this.commande.id}/`, this.headers)
			.then((response) => {
				let index = -1
				let commandes = this.$store.state.commandes
				for(var i=0; i<commandes.length; i++){
					if(commandes[i].id == this.commande.id){
						index = i;
						break
					}
				}
				this.$store.state.commandes.splice(index, 1)
				this.close()
			}).catch((error) => {
				console.error(error);
			});
		},
		enlever(recette){
			
		},
		ajouter(){

		},
		fetchData(){
			axios.get(this.host+'/recette/', this.headers)
			.then((response) => {
				this.$store.state.recettes = response.data;
			}).catch((error) => {
				console.error(error);
			});
		}
	},
	mounted(){
		if(this.$store.state.recettes.length == 0){
			this.fetchData()
		}
	}
};
</script>
<style>
input[type=number]{
	display: inline-block;
	width: 50px;
	margin-left: 5px;
}
</style>