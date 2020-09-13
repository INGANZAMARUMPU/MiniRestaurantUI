<template>
	<div id="panier" :class="{popup:true, active:status}"  @click="visible=false">
		<div class="popup-body" @click.prevent.stop>
			<table class="table panier">
				<caption class="header-panier">Panier</caption>
				<thead>
					<tr>
						<th>Name</th>
						<th>price</th>
						<th>quantity</th>
						<th>total</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody class=".popup-content">
					<tr v-for="item in cart" v-if="item.quantite>0">
						<td>{{item.recette.nom}}</td>
						<td>{{item.recette.prix}}</td>
						<td>{{item.quantite}}</td>
						<td>{{item.recette.prix*item.quantite}}</td>
						<td><button class="panier_moins" @click="decreaseQtt(item)">-</button></td>
						<td><button class="panier_plus" @click="increaseQtt(item)">+</button></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td>total</td>
						<td></td>
						<td></td>
						<td id="total"></td>
						<td></td>
						<td></td>
					</tr>
				</tfoot>
			</table>
			<div class="btns-valider">
				<button style="margin-right:3px" id="valider-panier">valider</button>
				<button id="valider_imprimer">valider et imprimer</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		cart:{ type:Array, default:[]},
		visible:{ type:Boolean, default:false}
	},
	methods: {
		increaseQtt : function(item){
			item.quantite++;
			this.$emit("item_add", {
				"recette": item.recette,
				"quantite": item.quantite
			})
		},
		decreaseQtt : function(item){
			if(item.quantite>0){
				item.quantite--;
				this.$emit("item_add", {
					"recette": item.recette,
					"quantite": item.quantite
				})
			}
		}
	},
	computed:{
		status:function(){
			if(this.cart.length < 1){
				this.visible=false;
			}
			return this.visible
		}
	}
};
</script>
<style scoped></style>