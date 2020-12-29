<template>
  <div id="app" @click="popover_opened=false">
    <div class="top">
      <SearchBar @changed="search"/>
      <DateFilter/>
    </div>
    <div class="recycler">
    </div>
      <div class="scrollable-tab">
        <table class="table menus">
          <thead>
            <tr class="panier-item">
              <th>id</th>
              <th>menu</th>
              <th>du</th>
              <th>au</th>
              <th>quantite</th>
            </tr>
          </thead>
          <tbody id="menus">
              <tr v-for="menu in menus">
                <td>#{{ menu.id }}</td>
                <td>Table {{ menu.table }}</td>
                <td>{{ menu.serveur_name }}</td>
                <td>{{ menu.nom }}</td>
                <td>{{ menu.quantite }}</td>
              </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "../components/search";
import DateFilter from "../components/date_filter";
import menu from "../components/menu";

export default {
  components:{
    SearchBar, restoMenu:menu, DateFilter
  },
  data(){
    return{
      menus : [],
      date_du : new Date().toLocaleDateString('fr-CA'),
      date_au : new Date().toLocaleDateString('fr-CA')
    }
  },
  mounted(){
    let result = this.$store.state.stats.menu;
    if (result.length > 0){
      this.menus = result;
    } else {
      let headers = {
        headers: {
          "Authorization": "Bearer " + this.$store.state.user.access
        }
      }
      axios.get(this.$store.state.host+'/statistic/menu/', headers)
      .then((response) => {
        this.$store.state.stats.menu = response.data;
        this.menus = response.data;
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  methods:{
    search(string){
      this.menus = [];
      for(var i = 0; i < this.$store.state.stats.menu.length; i++){
        let menu = this.$store.state.stats.menu[i];
        for (let key in menu) {
          var value = String(menu[key]).toLowerCase();
          if (value.search(string.toLowerCase()) >= 0 ) {
            this.menus.push(menu);
            break;
          }
        }
      }
    },
    filter(dates){
      this.date_du = dates.du;
      this.date_au = dates.au;
    }
  }
};
</script>
<style scoped>
.top{
  display: flex;
  justify-content: center;
}
.scrollable-tab{
  width: 100%;
  /*height: 0px;*/
  overflow: auto;
  padding: 0 20px;
  position: relative;
}
.scrollable-tab table thead tr th{
  position: sticky;
  top: 0;
}
.scrollable-tab table tfoot tr th{
  position: sticky;
  bottom: 0;
}
@media screen and (max-width: 650px){
  .scrollable-tab{
    position: inherit;
    height: auto;
    overflow-y: hidden;
  }
  .scrollable-tab table thead tr th{
    position: inherit;
  }
}
</style>
