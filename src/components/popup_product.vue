<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Produit</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_nom">Nom:</label>
					<input type="text" v-model="nom" placeholder="nom du produit" id="id_nom">
				</div>
				<div class="field">
					<label for="id_unite">Unité d'achat:</label>
					<input type="text" v-model="unite" placeholder="ex: kg, casier, carton..." id="id_unite">
				</div>
				<div class="field">
					<label for="id_sortant">Unité de vente:</label>
					<input type="text" v-model="sortant" placeholder="ex: kg, pieces, bouteils..." id="id_sortant">
				</div>
				<div class="field">
					<label for="id_rapport">Rapport entre les deux:</label>
					<input type="number" v-model="rapport" placeholder="1 par défaut" id="id_rapport">
				</div>
				<div class="submit">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Envoyer" @click="submit">
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	props: {
		visible:{ type:Boolean, default:false},
	},
	data(){
		return {
			logs:"",nom:"",unite:"",sortant:"",rapport:"",
			produit:null
		}
	},
	computed:{
		headers(){
			return {
				headers: {
					"Authorization": "Bearer " + this.$store.state.user.access
				}
			}
		},
		host(){
			return this.$store.state.host
		},
	},
	methods: {
		close(){
			this.$emit("close")
		},
		submit(){
			console.log(this.produit);
			if (!this.produit) {
				this.create()
			} else {
				this.update()
			}
		},
		create(){
			let data = {
				"nom":this.nom, "unite":this.unite,
				"unite_sortant":this.unitethis.sortant,
				"rapport":this.rapport,
			};
			axios.post(this.host+"/produit/", data, this.headers)
			.then((response) => {
				this.$store.state.stocks.push(response.data)
				this.close();
			}).catch((error) => {
				if (!!error.response) {
					this.logs = error.response.data
				} else {
					this.logs = "erreur inconnu";
					console.error(error)
				}
			})
		},
		update(){
		}
	}
};
</script>
<style scoped>
form{
	margin-top: 10px;
	display: flex;
	flex-direction: column;
}
form div{
	margin: 5px;
}
</style>