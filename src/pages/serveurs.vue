<template>
  <div id="app">
    <search-bar/>
    <div class="recycler">
      <resto-person v-for="x in 5" :serveur="serveurs[0]"/>
      <!-- <resto-person v-for="serveur in serveurs" :serveur="serveur"/> -->
    </div>
  </div>
</template>

<script>
import EVENT_BUS from "../main";
import searchbar from "../components/search";
import person from "../components/person";

export default {
  components:{
    searchBar: searchbar,
    restoPerson:person
  },
  data () {
    return{
      serveurs: [
        {avatar:"", firstname:"firstname", lastname:"lastname", tel:'0000000'}
      ],
    }
  },
  methods: {
  }
};
</script>
<style scoped>
  
</style>
