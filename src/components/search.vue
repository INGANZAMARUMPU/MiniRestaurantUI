<template>
  <center>
    <form>
      <input type="text" placeholder="Keyword" class="search-input"
      	id="id_username" v-model="keyword" autofocus>
      <button type="reset">X</button>
    </form>
  </center>
</template>

<script>
import EVENT_BUS from '../main'
export default {
	data(){
		return {
			keyword : ""
		}
	},
	watch:{
		keyword(val){
			this.$emit("changed", val);
		}
	}
};
</script>
<style scoped>
</style>
