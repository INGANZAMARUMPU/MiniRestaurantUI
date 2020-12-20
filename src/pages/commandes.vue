<template>
  <div id="app" @click="popover_opened=false">
    <search-bar/>
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
import searchbar from "../components/search";
import menu from "../components/menu";
// import popover from "../components/popup_panier";

export default {
  components:{
    searchBar: searchbar,
    restoMenu:menu,
    // cartPopover:popover
  },
};
</script>
<style scoped>
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
