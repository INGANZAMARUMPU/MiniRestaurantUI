<template>
	<router-link :to="{name:'menus', params:{id_table:id_table, id_serveur:serveur.id}}" class="user-card">
		<div class="img-user">
			<img :src='serveur.avatar' alt="">
		</div>
		<div class="username">
			<div><h3>{{ serveur.tel }}</h3></div>
			<div>
				{{ serveur.firstname }} {{ serveur.lastname }}
			</div>
	</div>
	</router-link>
</template>
<script >
import EVENT_BUS from '../main'
export default {
	props: {
		serveur: { type : Object, required:true},
		id_table: { type : String, required:true}
	},
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