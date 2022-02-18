<template>
	<div :class="{popup:true, active:visible}">
		<div class="popup-body" @click.prevent.stop>
			<center v-if="produit">
				<h3>Diminuer {{product_name}}</h3>
				<button @click="close" class="close">&times</button>
			</center>
			<form method="post" v-if="produit">
				<div class="field">
					<label for="id_quantite">Quantite:</label>
					<input type="number" v-model="quantite" placeholder="quantite" id="id_quantite" autocomplete="off">
				</div>
				<div class="field">
					<label for="id_motif">Motif:</label>
					<select v-model="motif" placeholder="motif " class="input" id="id_motif">
						<option value="vendu">vendu</option>
						<option value="perimé">perimé</option>
						<option value="cassé">cassé</option>
					</select>
				</div>
				<div class="submit">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Diminuer" @click="retirer">
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
		produit:{ type:Object, default:null}
	},
	data(){
		return {
			payee : 0, logs:"", quantite:"", motif:""
		}
	},
	computed:{
		product_name(){
			if(!!this.produit.nom) return this.produit.nom;
			return "";
		}
	},
	methods: {
		close(){
			this.$emit("close")
		},
		retirer(){
			let data = {
				produit : this.produit.id,
				quantite : this.quantite,
				motif : this.motif
			}
			axios.post(this.$store.state.host+"/sortie/", data, this.headers)
			.then((response) => {
				this.produit.quantite -= response.data.quantite;
				this.close()
			}).catch((error) => {
				this.displayErrorOrRefreshToken(error, this.retirer)
			});
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