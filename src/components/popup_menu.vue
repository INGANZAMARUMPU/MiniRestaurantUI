<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.stop>
			<center>
				<h3>Menu</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_nom">Nom:</label>
					<input type="text" name="nom" placeholder="nom" id="id_nom" v-model="nom">
				</div>
				<div class="field">
					<label for="id_image">Image:</label>
					<input type="file" name="image" ref="photo" id="id_image" @change="e => resizeImage(e)" accept=".png,.gif,.jpeg,.jpg">
				</div>
				<div class="field">
					<label for="id_details">Details:</label>
					<textarea placeholder="details" id="id_details" v-model="details"></textarea>
				</div>
				<div class="field">
					<label for="id_prix">Prix:</label>
					<input type="number" name="prix" placeholder="prix" id="id_prix" v-model="prix">
				</div>
				<div class="submit">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Envoyer" @click.prevent="createRecette">
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
			logs:"", nom:"", image:"", details:"",prix:"",
		}
	},
	computed:{
		headers(){
			return {
				headers: {
					"Authorization": "Bearer " + this.$store.state.user.access,
					"Content-Type": "multipart/form-data"
				}
			}
		},
		host(){
			return this.$store.state.host
		}
	},
	methods: {
		close(){
			this.$emit("close")
		},
		resizeImage(event){
			let image = this.$refs.photo.files[0];
			this.compress(image, 100, x => {
				this.image = image;
			});
		},
		createRecette(){
			let data = new FormData();
			data.append("nom", this.nom);
			data.append("image", this.image);
			data.append("details", this.details);
			data.append("prix", this.prix);

			axios.post(this.host+"/recette/", data, this.headers)
			.then((response) => {
				this.$store.state.recettes.push(response.data);
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