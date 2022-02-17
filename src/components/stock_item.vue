<template>
	<div class="parent">
		<div class="title">{{ produit.nom }}</div>
		<div>{{ produit.quantite }} {{ produit.unite_sortant }}</div>
		<div class="buttons">
			<button @click="decreaseStock">- Sortie</button>
			<button @click="increaseStock">+ Entrée</button>
		</div>
	</div>
</template>
<script >
export default {
	props: {
		produit: { type : Object, required: true}
	},
	methods:{
		decreaseStock(){
			this.$emit("out")
		},
		increaseStock(){
			this.$emit("in")
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
}
.title{
	font-size: 1.3em;
	padding-bottom: 5px;
}
.buttons{
	display: flex;
	border-top: 1px solid lightgray;
}
.buttons *{
	width: 50%;
	padding: 3px;
	text-align: center;
	border-radius: 0;
	margin: 0;
}
.buttons *:hover{
	background-color: #007799;
}
.buttons *:last-child{
	border-left: 1px solid lightgray;
}
</style>