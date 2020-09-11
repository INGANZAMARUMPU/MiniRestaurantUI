<template>
  <div id="app">
    <search-bar/>
    <div class="recycler">
      <resto-menu v-for="recette in recettes" :recette="recette"/>
    </div>
  </div>
</template>

<script>
import { EVENT_BUS } from "../main";
import searchbar from "../components/search";
import menu from "../components/menu";

export default {
  components:{
    searchBar: searchbar,
    restoMenu:menu
  },
  data () {
    return{
      recettes: EVENT_BUS.recettes,
    }
  },
  methods: {
  }
};
</script>
<style scoped>
  
</style>
