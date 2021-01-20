<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.stop>
			<center>
				<h3>Serveur</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_firstname">Prenom:</label>
					<input type="text" v-model="new_serveur.firstname" placeholder="firstname" id="id_firstname">
				</div>
				<div class="field">
					<label for="id_lastname">Nom:</label>
					<input type="text" v-model="new_serveur.lastname" placeholder="lastname" id="id_lastname">
				</div>
				<div class="field">
					<label for="id_avatar">photo de profile:</label>
					<input type="file" @change="chargerPhoto" name="avatar" id="id_avatar"
						accept=".jpg,.jpeg,.png,.gif" ref="avatar">
				</div>
				<div class="field">
					<label for="id_tel">Télephone:</label>
					<input type="number" v-model="new_serveur.tel" placeholder="tel" id="id_tel">
				</div>
				<div class="submit">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Envoyer" @click.prevent="submit">
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
	computed:{
		host(){
			return this.$store.state.host;
		}
	},
	watch:{
		serveur(new_val){
			if(!!new_val){
				this.new_serveur = serveur;
			} else{
				this.new_serveur = {};
			}
		}
	},
	data(){
		return {
			logs:"", avatar:null,
			new_serveur:{}
		}
	},
	methods: {
		close(){
			this.$emit("close")
		},
		chargerPhoto(e){
			this.avatar = this.$refs.avatar.files[0];
		},
		submit(){
			if(!!serveur){
				this.updateServeur();
			}else{
				this.addServeur()
			}
		},
		updateServeur(){
		},
		addServeur(){
			let headers = {
				headers: {
				"Authorization": "Bearer " + this.$store.state.user.access,
				"Content-Type": "multipart/form-data"
				}
			}
			let formData = new FormData();
			formData.append('avatar', this.avatar);
			formData.append('firstname', this.new_serveur.firstname);
			formData.append('lastname', this.new_serveur.lastname);
			formData.append('tel', this.new_serveur.tel);

			axios.post(this.host+"/serveur/", formData, headers)
			.then((response) => {
				this.$store.state.serveurs.push(response.data);
				this.close();
			}).catch((error) => {
			  console.error(error);
			})
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