<template>
  <div id="app">
    <SearchBar/>
    <div class="recycler">
      <resto-person v-for="serveur in serveurs" :serveur="serveur" :id_table="$route.params.id_table"/>
      <!-- <resto-person v-for="serveur in serveurs" :serveur="serveur"/> -->
    </div>
  </div>
</template>

<script>
import { EVENT_BUS } from "../main";
import SearchBar from "../components/search";
import person from "../components/person";

export default {
  components:{ SearchBar, restoPerson:person },
  data () {
    return{
      serveurs: this.$store.state.serveurs,
    }
  },
  methods: {
  }
};
</script>
<style scoped>
  
</style>
