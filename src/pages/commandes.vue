<template>
  <div id="app" @click="popover_opened=false">
    <div class="top">
      <SearchBar/>
      <DateFilter/>
    </div>
    <div class="recycler">
    </div>
      <div class="scrollable-tab">
        <table class="table commandes">
          <thead>
            <tr class="panier-item">
              <th>id</th>
              <th>table</th>
              <th>serveur</th>
              <th>somme</th>
              <th>payée</th>
              <th>Reste</th>
              <th>Date</th>
              <th><button onclick="toggleTableSize(event)">toggle display</button></th>
            </tr>
          </thead>
          <tbody id="commandes">
          </tbody>
          <tfoot>
            <tr class="panier-item">
              <th colspan="3">total</th>
              <th id="commande-somme">0</th>
              <th id="commande-payee">0</th>
              <th id="commande-reste">0</th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    <!-- <cart-popover :visible='popover_opened' :cart='cart' @item_add="addToCart"/> -->
  </div>
</template>

<script>
import { EVENT_BUS } from "../main";
import SearchBar from "../components/search";
import DateFilter from "../components/date_filter";
import menu from "../components/menu";
// import popover from "../components/popup_panier";

export default {
  components:{ SearchBar, restoMenu:menu, DateFilter },
  computed:{
    commandes(){
      result = this.$store.state.commandes;
      if( result !=null ){
        return result
      }
      let headers = {
        headers: {
          "Authorization": "Bearer " + this.user.access
        }
      }
      axios.get(this.$store.state.host+'/commandes/', headers)
        .then((response) => {
          this.$store.state.commandes = response.data;
          return response.data;
        }).catch((error) => {
          console.error(error);
        });
      return [];
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
