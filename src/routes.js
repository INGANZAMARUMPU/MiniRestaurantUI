import Tables from "./pages/tables"
import Serveurs from "./pages/serveurs"
import Menus from "./pages/menus"

export const routes = [
	{path: "", component: Tables, name:"tables"},
	{path: "/commande/:id_table", component: Serveurs, name:"serveurs"},
	{path: "/commande/:id_table/:id_serveur", component: Menus, name:"menus"}
]