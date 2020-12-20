<template>
	<div class="centered">
		<form action="." method="post">
	    <h1>WELCOME BACK</h1>
		    <div class="field">
				<label for="id_username">Username&nbsp;:</label>
				<input type="text" name="username" placeholder="Username " required="" id="id_username">
			</div>
		    <div class="field">
				<label for="id_password">Password&nbsp;:</label>
				<input type="password" name="password" placeholder="Password " required="" id="id_password">
			</div>
			<div class="btns">
	    		<button @click.prevent="logIn">Log In</button>
			</div>
		</form>
	</div>
</template>
<script >
export default {
	data(){
		return {
			user: this.$store.state.user,
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