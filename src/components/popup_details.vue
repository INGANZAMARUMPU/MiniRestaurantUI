<template>
	<div id="panier" :class="{popup:true, active:visible}">
		<div class="popup-body" @click.prevent.stop v-if="!!commande">
			<table class="table panier">
				<caption class="title">Details Commande #{{commande.id}}</caption>
				<button @click="close" class="close">&times</button>
				<thead>
					<tr>
						<th>Name</th>
						<th>price</th>
						<th>quantity</th>
						<th>total</th>
					</tr>
				</thead>
				<tbody class=".popup-content">
					<tr v-for="details in commande.details">
						<td>{{details.nom}}</td>
						<td>{{details.prix}}</td>
						<td>x {{details.quantite}}</td>
						<td>{{details.somme}}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>total</td>
						<td></td>
						<td></td>
						<td>{{ commande.a_payer }}</td>
					</tr>
				</tfoot>
			</table>
			<div class="btns-valider">
				<button style="margin-right:3px"vid="valider-panier"
					>
					supprimer
				</button>
				<button @click="imprimer">
					imprimer
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";
export default {
	props: {
		visible:{ type:Boolean, default:false},
		commande:{ type:Object, default:null}
	},
	methods: {
		close(){
			this.$emit("close")
		},
		imprimer(){
			window.print()
		}
	}
};
</script>
<style>
</style>