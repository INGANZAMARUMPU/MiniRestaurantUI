<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Augmenter {{produit.nom}}</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_quantite">Quantite:</label>
					<input type="text" placeholder="quantite" id="id_quantite"
						v-model="achat.quantite">
				</div>
				<div class="field">
					<label for="id_prix">Prix d'achat:</label>
					<input type="number" placeholder="Prix d'achat" id="id_prix"
						v-model="achat.prix">
				</div>
    			<input type="submit" name="submit" value="submit"
    				style="align-self:flex-end;" @click="acheter">
			</form>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	props: {
		visible:{ type:Boolean, default:false},
		produit:{ type:Object, required:true}
	},
	data(){
		return {
			payee : 0,
			achat:{}
		}
	},
	methods: {
		close(){
			this.$emit("close")
		},
		acheter(){
			let headers = {
				headers: {
				"Authorization": "Bearer " + this.$store.state.user.access
				}
			}
			this.achat.produit = this.produit.id
			this.achat.quantite = eval(this.achat.quantite);
			axios.post(this.$store.state.host+"/achat/",this.achat, headers)
			.then((response) => {
				this.produit.quantite += response.data.quantite;
			}).catch((error) => {
				console.error(error);
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