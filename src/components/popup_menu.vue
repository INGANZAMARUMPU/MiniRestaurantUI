<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Menu</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_nom">Nom:</label>
					<input type="text" name="nom" placeholder="nom" id="id_nom">
				</div>
				<div class="field">
					<label for="id_image">Image:</label>
					<input type="file" name="image" id="id_image">
				</div>
				<div class="field">
					<label for="id_details">Details:</label>
					<textarea placeholder="details" id="id_details"></textarea>
				</div>
				<div class="field">
					<label for="id_prix">Prix:</label>
					<input type="number" name="prix" placeholder="prix" id="id_prix">
				</div>
				<div class="field">
					<label for="id_produit">Produit:</label>
					<input type="text" name="produit" placeholder="produit" id="id_produit">
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
		recette:{ type:Object, default:null}
	},
	data(){
		return {
			logs:""
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