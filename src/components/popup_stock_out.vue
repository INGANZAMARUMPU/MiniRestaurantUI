<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Diminuer {{produit.nom}}</h3>
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
    			<input type="submit" name="submit" value="submit" style="align-self:flex-end;">
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