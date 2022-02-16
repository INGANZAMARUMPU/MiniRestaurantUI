<template>
	<div :class="{popup:true, active:visible}">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Diminuer {{product_name}}</h3>
				<button @click="close" class="close">&times</button>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_quantite">Quantite:</label>
					<input type="number" name="quantite" placeholder="quantite" required="" id="id_quantite">
				</div>
				<div class="field">
					<label for="id_motif">Motif:</label>
					<select name="motif" placeholder="motif " class="input" id="id_motif">
						<option value="vendu">vendu</option>
						<option value="perimé">perimé</option>
					</select>
				</div>
				<div class="submit">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Diminuer" @click="">
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
	computed:{
		product_name(){
			if(!!this.produit.nom) return this.produit.nom;
			return "";
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