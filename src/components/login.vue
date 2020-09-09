<template>
	<div>
		<form action="." method="post" class="login-form">
	    <h1>WELCOME BACK</h1>
			<label for="id_username">Username&nbsp;:</label>
			<input type="text" name="username" placeholder="Username " class="input" required="" id="id_username">
			<label for="id_password">Password&nbsp;:</label>
			<input type="password" name="password" placeholder="Password " class="input" required="" id="id_password">
	    	<button class="btn right" @click.prevent="logIn">Log In</button>
		</form>
	</div>
</template>
<script >
import EVENT_BUS from '../main'
export default {
	data(){
		return {
			user: null
		}
	},
	props: {
		state : { type:Boolean, required: true }
	},
	methods:{
	    logIn(){
	    	this.user = {
				username:"default",
				is_staff:true,
				connected:true
			};
	    	this.$emit("connected", this.user);
	    }
	}
};
</script>
<style scoped>
label{
	margin-top: 1em;
}
</style>