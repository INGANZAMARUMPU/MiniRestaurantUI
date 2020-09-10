import Tables from "./pages/tables"
import Serveurs from "./pages/serveurs"

export const routes = [
	{path: "", component: Tables, name:"tables"},
	{path: "/commande/:id_table", component: Serveurs, name:"serveurs"}
]