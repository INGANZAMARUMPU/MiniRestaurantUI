<template>
	<div class="parent">
		<ul>
			<li class="toggle-submenu">
				<router-link :to="{name:'tables'}">Tables</router-link>
			</li>
			<li><router-link to="/commandes">Commandes</router-link>
			<li class="toggle-submenu">
				<router-link to="/stock">Stock</router-link>
			</li>
			<li v-if="user.is_admin" @mouseenter="e => showSubmenu(e)"
				@mouseleave="e => hideSubmenu(e)">
				<router-link to="">Courbes</router-link>
				<div class="submenu">
					<router-link to="">Menu</router-link>
					<router-link to="">Serveurs</router-link>
				</div>
			</li>
			<li v-if="user.is_admin" @mouseenter="e => showSubmenu(e)"
				@mouseleave="e => hideSubmenu(e)">
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
	},
	methods:{
		showSubmenu(event){
			let item = event.target.getElementsByClassName("submenu")[0];
			item.style.display = 'block';
		},
		hideSubmenu(event){
			let item = event.target.getElementsByClassName("submenu")[0];
			item.style.display = 'none';
		}
	}
};
</script>
<style scoped>
.parent{
	position: sticky;
	top: 0;
	margin-bottom: 10px;
}
a{
	color: white;
}
ul{
	background-color: #007799;
	font-size: 1.5em;
	display: flex;
}
li{
	padding: 5px 0;
	list-style-type: none;
	flex-grow: 1;
	text-align: center;
	position: relative;
}
.submenu{
	display: none;
	position: absolute;
	background-color: #007799;
	right: 0;
	z-index: 3;
}
.submenu a{
	display: block;
	padding: 3px 5px;
	font-size: 14pt;
}
.submenu a:hover, li:hover{
	background-color: #0088aa;
}
@media screen and (max-width: 650px){
	ul{
		display: block;
	}
}
</style>