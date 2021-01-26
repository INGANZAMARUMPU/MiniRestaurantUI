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
			<li v-if="user.is_admin" @mouseenter="e => showSubmenu(e)"@mouseleave="e => hideSubmenu(e)">
				<router-link to="">Statistiques</router-link>
				<div class="submenu">
					<router-link to="stat_menu">Menu</router-link>
					<router-link to="stat_service">Service</router-link>
					<router-link to="">Achats</router-link>
				</div>
			</li>
		</ul>
	</div>
</template>
<script >
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
	z-index: 3;
}
a{
	color: white;
	display: block;
	width: 100%;
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
	margin-top:5px;
	background-color: #007799;
	width: -moz-available;
	width: -webkit-fill-available;
	border: 1px solid #068;
	box-shadow: 0 3px 3px 1px #aaa;
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