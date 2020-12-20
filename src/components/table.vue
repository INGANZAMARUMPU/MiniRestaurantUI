<template>
	<div class="parent">
		<div class="title">Table {{ number }}</div>
		<div class="buttons">
			<router-link
				:to="{name:'serveurs', params:{id_table:id_table}}">
				+Commande
			</router-link>
			<router-link to="#">Payer</router-link>
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
	border-bottom: 1px solid lightgray;
}
.buttons{
	display: flex;
}
.buttons *{
	width: 50%;
	padding: 3px;
	text-align: center;
}
.buttons *:hover{
	background-color: #007799;
}
.buttons *:last-child{
	border-left: 1px solid lightgray;
}
</style>