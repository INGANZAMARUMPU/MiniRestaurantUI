<template>
	<div>
		<router-link >
		<div class="user-card">
			<div class="img-user">
				<img :src='serveur.avatar' alt="">
			</div>
			<div class="username">
				<div><h3>{{ serveur.tel }}</h3></div>
				<div>
					{{ serveur.firstname }} {{ serveur.lastname }}
				</div>
			</div>
		</div>
		</router-link>
	</div>
</template>
<script >
import EVENT_BUS from '../main'
export default {
	props: {
		serveur: { 
			type : Object,
			required:true
		},
		id_table: { 
			type : Number,
			required:true
		}
	},
};
</script>
<style scoped>
</style>