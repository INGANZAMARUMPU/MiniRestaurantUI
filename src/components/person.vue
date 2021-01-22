<template>
<div class="user-card" @click="gotoMenus"
	:class="{disabled:!serveur.is_active}">
	<div class="img-user">
		<img :src='getAvatar(serveur)' alt="">
	</div>
	<div class="username">
		<div><h3>{{ serveur.tel }}</h3></div>
		<div>
			{{ serveur.firstname }} {{ serveur.lastname }}
		</div>
	</div>
</div>
</template>
<script >
export default {
	props: {
		serveur: { type : Object, required:true}
	},
	methods:{
		getAvatar(serveur){
			if (serveur.avatar == null) {
				return "/img/ic_user.png";
			}
			return serveur.avatar;
		},
		gotoMenus(){
			if(this.serveur.is_active){
				this.$store.state.selected_serveur = this.serveur;
				this.$router.push('menus');
			}
		}
	}
};
</script>
<style scoped>
.user-card{
	text-align: center;
	width: 140px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	padding: 10px 5px;
	margin: 10px;
	background-color: #fff;
	border-radius: 5px;
}
.user-card:hover{
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	cursor: pointer;
}
.img-user{
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: #ddd;
	overflow: hidden;
	margin: auto;
}
.img-user img{
	width: 100%;
}
</style>