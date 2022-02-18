<template>
	<div :class="{popup:true, active:visible}">
		<div class="popup-body" @click.prevent.stop>
			<center v-if="produit">
				<h3>Augmenter {{produit.nom}}</h3>
				<button @click="close" class="close">&times</button>
			</center>
			<form method="post">
				<div class="field" v-if="produit">
					<label for="id_quantite">
						Quantite:
						<span v-if="achat.quantite">({{achat.quantite*produit.rapport}} {{ produit.unite_sortant }})</span>
					</label>
					<input type="text" placeholder="quantite" id="id_quantite"
						v-model="achat.quantite" autocomplete="off">
				</div>
				<div class="field">
					<label for="id_prix">Prix d'achat:</label>
					<input type="number" placeholder="Prix d'achat" id="id_prix"
						v-model="achat.prix" autocomplete="off">
				</div>
				<div class="submit">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Acheter" @click="acheter">
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
			payee:0, achat:{}, logs:""
		}
	},
	methods: {
		close(){
			this.$emit("close")
		},
		acheter(){
			let data = {
				produit: this.produit.id,
				quantite: eval(this.achat.quantite)*this.produit.rapport,
				prix: eval(this.achat.prix)
			}
			axios.post(this.$store.state.host+"/achat/", data, this.headers)
			.then((response) => {
				this.produit.quantite += response.data.quantite;
				this.close()
			}).catch((error) => {
				if (!!error.response) {
					this.logs = error.response.data.status
				} else {
					this.logs = "une erreur est survenue";
				}
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