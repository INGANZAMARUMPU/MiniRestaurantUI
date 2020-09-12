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
</style>