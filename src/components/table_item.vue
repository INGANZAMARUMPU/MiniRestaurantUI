<template>
	<div class="parent">
		<div class="title">Table {{ table.number }}</div>
		<div class="buttons">
			<button @click="gotoServeurs">
				+Commande
			</button>
			<button>Payer</button>
		</div>
	</div>
</template>
<script >
import EVENT_BUS from '../main'
export default {
	props: {
		table: { type : Object, required:true },
	},
	methods:{
		gotoServeurs(){
			this.$store.state.selected_table = this.table;
			this.$router.push('serveurs')
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
	border-bottom: 1px solid lightgray;
}
.buttons{
	display: flex;
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