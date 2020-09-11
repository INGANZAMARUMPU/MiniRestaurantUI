<template>
	<div>
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
				<button class="left-button bg-blue recette_moins">-</button>
				<label class="noir-blanc recette_qtt">0</label>
				<button class="right-button bg-blue recette_plus">+</button>
			</div>
		</div>
	</div>
</template>
<script >
import EVENT_BUS from '../main'
export default {
	props: {
		recette:{type:Object, required:true}
	}
};
</script>
<style scoped>
</style>