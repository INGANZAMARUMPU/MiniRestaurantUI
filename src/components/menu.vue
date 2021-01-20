<template>
	<div class="parent" :data-id='recette.id'
		@contextmenu.prevent="e => emitContext(e)"
		:class="{disabled:!recette.is_active}">
		<div class="img food-img">
			<img :src="getIcon(recette)" height="112px" style="margin:5px" />
		</div>
		<div class="title">
			<span class="name">{{ recette.nom }}</span>
			<span class="prix"> {{ money(recette.prix) }}</span>
			Fbu
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
				return "/img/recette.png";
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
		},
		emitContext(e){
			this.$emit("contextmenu", {
				"event":e, "recette":this.recette
			});
		}
	}
};
</script>
<style scoped>
*{
	color: white; 
}
.parent{
    background: #0088aa;
    border-radius: 5px;
    padding: 3px;
    margin: 3px;
    width: 200px;
	text-align: center;
	display: flex;
	flex-direction: column;
}
.title{
	font-size: 1.1em;
	padding-bottom: 5px;
}
.buttons{
	display: flex;
	margin-top: auto;
	border-top: 1px solid lightgray;
}
button{
	width: 35%;
	padding: 7px;
	margin: 0;
	text-align: center;
	border-radius: 0;
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
</style>