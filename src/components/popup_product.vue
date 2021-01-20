<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Produit</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_nom">Nom:</label>
					<input type="number" name="nom" placeholder="nom" required="" id="id_nom">
				</div>
				<div class="field">
					<label for="id_unite">Unité d'achat:</label>
					<input type="number" name="unite" placeholder="Unité d'achat" required="" id="id_unite">
				</div>
				<div class="field">
					<label for="id_sortant">Unité de vente:</label>
					<input type="number" name="sortant" placeholder="Unité de vente" required="" id="id_sortant">
				</div>
				<div class="field">
					<label for="id_rapport">Rapport entre les deux:</label>
					<input type="number" name="rapport" placeholder="1 unité d'achat = combien" required="" id="id_rapport">
				</div>
				<div class="submit">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Envoyer" @click="">
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
		produit:{ type:Object, required:true}
	},
	data(){
		return {
			payee : 0, logs:""
		}
	},
	methods: {
		close(){
			this.$emit("close")
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