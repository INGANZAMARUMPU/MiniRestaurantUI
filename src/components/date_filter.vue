<template>
  <div>
    <button @click="triggered=!triggered">Date</button>
    <form v-if="triggered">
    	<label>Du:</label>
    	<input type="date" name="date_du" v-model="date.du"/>
    	<label>Au:</label>
    	<input type="date" name="date_au" v-model="date.au"/>
    	<input type="submit" value="search"
    		@click.prevent.stop="performSearch"
    		style="border:1px solid black" 
    	/>
    </form>
  </div>
</template>

<script>
export default {
	data(){
		return {
			date:{ du:null, au:null},
			triggered:false,
		}
	},
	methods:{
		performSearch(){
			this.triggered=false;
			this.$emit("changed", this.date);
		}
	}
};
</script>
<style scoped>
form{
	position: absolute;
	z-index: 3;
	background-color: cadetblue;
	border-radius: 5px;
	padding: 5px 10px;
	box-shadow: 5px 5px 5px black;
}
input[type=date]{
	display: block;
	font-size: 1.3em;
	font-weight: bold;
	width: 200px;
}
label{
	font-size: .8em;
}
</style>
