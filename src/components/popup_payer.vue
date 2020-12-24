<template>
	<div :class="{popup:true, active:visible}" @click="visible=false">
		<div class="popup-body" @click.prevent.stop>
			<center>
				<h3>Payment facture #{{commande.id}}</h3>
			</center>
			<form method="post">
				<div>la somme à payer est <b>{{ commande.a_payer }}</b></div>
				<div class="field">
					<label>la somme payée :</label>
					<input type="number" v-model="payee"/>
				</div>
				<div>la somme à rendre est <b>
					{{ payee - commande.a_payer }}
				</b></div>
				<input type="submit" name="payer"
					style="align-self:flex-end;">
			</form>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	props: {
		visible:{ type:Boolean, default:false},
		commande:{ type:Object, required:true}
	},
	data(){
		return {
			payee : 0,
		}
	},
	methods: {
	}
};
</script>
<style scoped>
form{
	margin-top: 10px;
	display: flex;
	flex-direction: column;
}
form div{
	margin: 5px;
}
</style>