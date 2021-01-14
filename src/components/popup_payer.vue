<template>
	<div :class="{popup:true, active:visible}" @click="close">
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
					style="align-self:flex-end;" @click="performPayment">
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
	computed:{
		host(){
			return this.$store.state.host
		}
	},
	methods: {
		close(){
			this.$emit("close")
		},
		performPayment(){
			let headers = {
				headers: {
					"Authorization": "Bearer " + this.$store.state.user.access
				}
			};
			let data = {
				commande:this.commande.id,
				somme:this.payee
			}
			axios.post(this.host+'/paiement/', data, headers)
			.then((response) => {
				this.commande.payee += parseInt(this.payee);
				this.close()
			}).catch((error) => {
				console.error(error);
			});

		}
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