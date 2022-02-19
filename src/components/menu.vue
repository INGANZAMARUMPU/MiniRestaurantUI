<template>
	<div class="parent" :data-id='recette.id'
		:class="{disabled:!recette.is_active}">
		<div class="img food-img">
			<img :src="getIcon(recette)"/>
		</div>
		<div class="title">
			{{ recette.nom }}
			<span class="prix">{{ money(recette.prix) }}FBu</span>
		</div>
		<div class="buttons">
			<button class="left-button bg-blue recette_moins" @click="decreaseQtt">-</button>
			<label class="noir-blanc recette_qtt">{{ quantite }}</label>
			<button class="right-button bg-blue recette_plus" @click="increaseQtt">+</button>
		</div>
	</div>
</template>
<script >
export default {
	props: {
		recette:{type:Object, required:true}
	},
	data:function (){
		return {
			cart : this.$store.state.cart,
		}
	},
	computed:{
		quantite(){
			return this.cart.getQuantite(this.recette.id);
		}
	},
	methods: {
		getIcon(recette){
			if (recette.image == null) {
				return "/static/logo.png";
			}
			return recette.image;
		},
		increaseQtt : function(){
			if(!this.recette.is_active) return;
			this.cart.add(this.recette);
		},
		decreaseQtt : function(){
			if(!this.recette.is_active) return;
			this.cart.decrease(this.recette.id);
		}
	}
};
</script>
<style scoped>
*{
	color: white; 
}
.parent{
	border: 1px solid #08a;
	background-color: lightgray;
    border-radius: 5px;
    margin: 3px;
    width: 200px;
	text-align: center;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
.title{
	font-size: 1em;
	padding: 5px 0;
	text-overflow: ellipsis;
	word-wrap: break-word;
	z-index: 1;
	background-color: #0005;
	margin: 0;
	height: 100%;
	backdrop-filter: blur(2px);
	-webkit-backdrop-filter: blur(2px);
}
.prix{
	background-color: #08a;
	color: white;
	border-radius: 5px;
	white-space: nowrap;
	padding: 0 5px;
}
.buttons{
	display: flex;
	margin-top: auto;
	border-top: 1px solid #08A;
	z-index: 1;
}
button{
	width: 35%;
	padding: 7px;
	margin: 0;
	text-align: center;
	border-radius: 0;
	background-color: #08A;
	font-weight: 700;
	color: white;
}
label{
	flex-grow: 1;
	background-color: white;
	color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}
button:hover{
	background-color: #007799;
}
.img{
	height: 100px;
	position: relative;
	z-index: 0;
}
img{
	width: 100%;
}
</style>