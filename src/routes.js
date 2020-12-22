import Tables from "./pages/tables"
import Serveurs from "./pages/serveurs"
import Menus from "./pages/menus"
import Commandes from "./pages/commandes"
import Stock from "./pages/stock"

export const routes = [
	{path: "", component: Tables, name:"tables"},
	{path: "/serveurs", component: Serveurs, name:"serveurs"},
	{path: "/menus", component: Menus, name:"menus"},
	{path: "/commandes/", component: Commandes, name:"commandes"},
	{path: "/stock/", component: Stock, name:"stock"},
]