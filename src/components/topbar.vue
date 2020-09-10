<template>
	<div>
		<ul class="top-menu"> <!--floating-right-center">-->
			<li class="toggle-submenu">
				<router-link :to="{name:'tables'}">Tables</router-link>
			</li>
			<li><router-link to="">Commandes</router-link>
			<li class="toggle-submenu">
				<router-link to="">Stock</router-link>
			</li>
			<li class="toggle-submenu" v-if="user.is_staff">
				<router-link to="">Courbes</router-link>
				<div class="submenu">
					<router-link to="">Menu</router-link>
					<router-link to="">Serveurs</router-link>
				</div>
			</li>
			<li class="toggle-submenu" v-if="user.is_staff">
				<router-link to="">Gestion</router-link>
				<div class="submenu">
				   <a target="blank" href="#">Tables</a>
				   <a target="blank" href="#">Stock</a>
				   <a target="blank" href="#">Produit</a>
				   <a target="blank" href="#">Offre</a>
				   <a target="blank" href="#">Fournisseur</a>
				   <a target="blank" href="#">Serveur</a>
				</div>
			</li>
		</ul>
	</div>
</template>
<script >
import EVENT_BUS from '../main'
export default {
	props: {
		user:{
			type:Object,
			required:true
		}
	}
};
</script>
<style scoped>
</style>