<template>
  <div id="app">
    <search-bar/>
    <div class="recycler">
      <resto-person v-for="serveur in serveurs" :serveur="serveur" :id_table="$route.params.id_table"/>
      <!-- <resto-person v-for="serveur in serveurs" :serveur="serveur"/> -->
    </div>
  </div>
</template>

<script>
import { EVENT_BUS } from "../main";
import searchbar from "../components/search";
import person from "../components/person";

export default {
  components:{
    searchBar: searchbar,
    restoPerson:person
  },
  data () {
    return{
      serveurs: EVENT_BUS.serveurs,
    }
  },
  methods: {
  }
};
</script>
<style scoped>
  
</style>
