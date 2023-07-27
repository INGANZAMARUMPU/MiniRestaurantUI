import { createRouter, createWebHistory } from 'vue-router'
import Tables from "../pages/tables"
import Serveurs from "../pages/serveurs"
import Menus from "../pages/menus"
import Commandes from "../pages/commandes"
import Stock from "../pages/stock"
import StatMenus from "../pages/statistic_menu"
import StatServices from "../pages/statistic_service"

const routes = [
  {path: "", component: Tables, name:"tables"},
  {path: "/serveurs", component: Serveurs, name:"serveurs"},
  {path: "/menus", component: Menus, name:"menus"},
  {path: "/commandes/", component: Commandes, name:"commandes"},
  {path: "/stock/", component: Stock, name:"stock"},
  {path: "/stat_menu/", component: StatMenus, name:"stat_menu"},
  {path: "/stat_service/", component: StatServices, name:"stat_service"},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
