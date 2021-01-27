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
				<div v-if="dette_enabled">
					<div class="field">
						<label for="">nom :</label>
						<input type="text" name="">
					</div>
					<div class="field">
						<label for="">Telephone :</label>
						<input type="text" name="">
					</div>
				</div>
				<div class="submit">
					<div class="logs">{{logs}}</div>
					<input type="submit" value="Payer" @click="performPayment">
				</div>
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
		return {logs:"", payee:0}
	},
	computed:{
		host(){
			return this.$store.state.host
		},
		dette_enabled(){
			return this.commande.a_payer>this.payee
		},
	},
	watch:{
		commande(new_val){
			this.payee = new_val.a_payer;
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
				if (!!error.response) {
					this.logs = error.response.data.status
				} else {
					this.logs = "une erreur est survenue";
				}
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