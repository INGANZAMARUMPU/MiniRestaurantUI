<template>
<div class="printable invoice">
    <center class="header">
        <img width=100 src="/static/logo.png" style="display:block" />
        <div v-if="!!commande">
            Facture no. {{commande.id}} du {{datetime(commande.date)}}<br>
        </div>
        <div style="text-align: left; display: inline-block;">
            RC 35469/22<br />
            NIF 4001909714
        </div>
        <div>
            Tel: 68 13 22 39<br/>
            MIAMI BEACH<br/>
            Bujumbura, KAJAGA
        </div>
        <div v-if="!!commande"><b>{{ commande.client }}</b></div>
    </center>
    <table style="width:100%;">
        <thead>
            <tr style="border-bottom: 1px solid #aaa;text-align: left;">
                <th>Article</th>
                <th style="">P.U.</th>
                <th>Qt.</th>
                <th style="text-align: right;">Total</th>
            </tr>
        </thead>
        <tbody v-if="!!commande">
            <tr style="text-align: left;" v-for="item in commande.details">
                <td>{{ item.nom }}</td>
                <td>{{ item.prix }} Fbu</td>
                <td>x {{ item.quantite }}</td>
                <td style="text-align: right;">{{ item.somme }} Fbu</td>
            </tr>
            <tr style="border-top: 1px solid #aaa;text-align: left;">
                <th colspan="3">Total</th>
                <th style="text-align: right;"><b>{{ commande.a_payer }} Fbu</b></th>
            </tr>
        </tbody>
    </table>
    <div style="margin:10px" v-if="!!commande">
        Caissier: {{ commande.serveur||"" }}
    </div>
    <center>
    	<strong>Murakoze, Merci, Thank you!</strong>
    </center>
</div>
</template>
<script>
export default {
	data(){
		return {
			commande : this.$store.state.commande
		}
	},
	watch:{
		"$store.state.commande":{
			deep:true,
			handler(new_val){
				console.log('something changed')
				this.commande =  this.$store.state.commande
			}
		}
	}
};
</script>
<style scoped>
.invoice{
	position: fixed;
}
*{
	margin: 0;
}
.header *{
	margin: 10px 0;
}
</style>