<template>
	<div class="centered">
		<form action="." method="post">
	    <h1>WELCOME BACK</h1>
		    <div class="field">
				<label for="id_username">Username&nbsp;:</label>
				<input type="text" name="username" placeholder="Username " required
					id="id_username" v-model="username" autocomplete="on">
			</div>
		    <div class="field">
				<label for="id_password">Password&nbsp;:</label>
				<input type="password" name="password" placeholder="Password " required
					id="id_password" v-model="password" autocomplete="on">
			</div>
			<label for="id_password" v-if="error.length>0"
				 style="color:red">{{ error }}
			</label>
			<div class="btns">
	    		<button @click.prevent="logIn">Log In</button>
			</div>
		</form>
	</div>
</template>
<script >
import axios from "axios";

export default {
	data(){
		return {
			username:"",
			password:"",
			user: null,
			error:""
		}
	},
	methods:{
	    logIn(){
	    	this.error = ""
			axios.post(this.$store.state.host+"/login/", {
				"username": this.username,
				"password": this.password
			})
			.then((response) => {
				this.user = response.data;
				if (this.user != null && this.user.access.length>20) {
					this.$store.state.user = this.user;
					this.$emit("connected", this.user);
				} else {
					this.error = "nom d'utilisateur ou mot de passe incorrect"
				}
			}).catch((error) => {
				this.error = "erreur de connectivité"
				console.error(error);
			});
	    }
	}
};
</script>
<style scoped>
.centered{
	display: flex;
	justify-content: center;
	margin-top: 100px;
}
form{
	background-color: white;
	width: 400px;
	padding: 20px;
	border-radius: 4px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, .25);
}
.btns{
	display: flex;
	justify-content: flex-end;
}
</style>