<template>
	<div>
		<div class="basic-card bg-blue">
			<div class="title">Table {{ number }}</div>
			<div class="buttons">
				<router-link class="semi-button"
					:to="{name:'serveurs', params:{id_table:id_table}}">
					+Commande
				</router-link>
				<router-link to="#" class="semi-button border-left">Payer</router-link>
			</div>
		</div>
	</div>
</template>
<script >
import EVENT_BUS from '../main'
export default {
	props: {
		id_table: { type : String, required:true},
		number: { type : Number, required:true}
	},
};
</script>
<style scoped>
</style>