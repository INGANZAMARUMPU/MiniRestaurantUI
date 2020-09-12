<template>
	<div id="panier" class="popup">
		<div class="popup-body">
			<table class="table panier">
				<caption class="header-panier">Panier</caption>
				<thead>
					<tr>
						<th>Name</th>
						<th>price</th>
						<th>quantity</th>
						<th>total</th>
					</tr>
				</thead>
				<tbody class=".popup-content">
				</tbody>
				<tfoot>
					<tr>
						<td>total</td>
						<td></td>
						<td></td>
						<td id="total"></td>
					</tr>
				</tfoot>
			</table>
			<div class="btns-valider">
				<button style="margin-right:3px" id="valider-panier">valider</button>
				<button id="valider_imprimer">valider et imprimer</button>
			</div>
		</div>
	</div>
</template>
<script>
</script>
<style scoped></style>