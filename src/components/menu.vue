<template>
	<div class="basic-card bg-blue recette" :data-id='recette.id'>
		<div class="img food-img">
			<img :src="recette.image"/>
		</div>
		<div class="subtitle">
			<span class="name">{{ recette.nom }}</span>
			<span class="prix">{{ recette.prix }}</span>
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
import EVENT_BUS from '../main'
export default {
	props: {
		recette:{type:Object, required:true}
	},
	data:function (){
		return {
			quantite : 0
		}
	},
	methods: {
		increaseQtt : function(){
			this.quantite++;
			this.$emit("item_add", {
				"recette": this.recette,
				"quantite": this.quantite
			})
		},
		decreaseQtt : function(){
			if(this.quantite>0){
				this.quantite--;
				this.$emit("item_add", {
					"recette": this.recette,
					"quantite": this.quantite
				})
			}
		}
	}
};
</script>
<style scoped>
</style>