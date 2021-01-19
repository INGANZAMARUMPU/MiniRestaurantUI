<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Serveur</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_firstname">Prenom:</label>
					<input type="text" name="firstname" placeholder="firstname" id="id_firstname">
				</div>
				<div class="field">
					<label for="id_lastname">Nom:</label>
					<input type="text" name="lastname" placeholder="lastname" id="id_lastname">
				</div>
				<div class="field">
					<label for="id_avatar">photo de profile:</label>
					<input type="file" name="avatar" id="id_avatar">
				</div>
				<div class="field">
					<label for="id_tel">Télephone:</label>
					<input type="number" name="tel" placeholder="tel" id="id_tel">
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
		serveur:{ type:Object, default:null}
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