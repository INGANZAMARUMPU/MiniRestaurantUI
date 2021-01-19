<template>
	<div :class="{popup:true, active:visible}" @click="close">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Table</h3>
			</center>
			<form method="post">
				<div class="field">
					<label for="id_nom">Nom ou Place:</label>
					<input type="text" placeholder="nom" id="id_nom"v-model="nom">
				</div>
				<div class="field">
					<label for="id_number">Numéro:</label>
					<input type="number" placeholder="numero de la table" id="id_number" v-model="number">
				</div>
				<div class="submit">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Ajouter" @click="submit">
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
		table:{ type:Object, default:null},
	},
	data(){
		return {logs:"", nom:"",number:""}
	},
	computed:{
		host(){
			return this.$store.state.host;
		}
	},
	methods: {
		close(){
			this.$emit("close")
		},
		submit(){
			if(!!this.table){
				editTable()
			}else{
				addTable()
			}
		},
		editTable(){
			let headers = {
				headers: {
				"Authorization": "Bearer " + this.$store.state.user.access
				}
			}
			data = { nom : this.nom, number : this.number};
			axios.put(this.host+`/table/$(this.table.id)/`,this.data, headers)
			.then((response) => {
				this.table.nom = response.data.nom;
				this.table.number = response.data.number;
			}).catch((error) => {
				if (!!error.response) {
					this.logs = error.response.data.status
				} else {
					this.logs = "une erreur est survenue";
				}
			});
		},
		addTable(){
			let headers = {
				headers: {
				"Authorization": "Bearer " + this.$store.state.user.access
				}
			}
			data = { nom : this.nom, number : this.number};
			axios.post(this.host+"/table/",data, headers)
			.then((response) => {
				this.$store.state.tables.unshift(response.data);
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