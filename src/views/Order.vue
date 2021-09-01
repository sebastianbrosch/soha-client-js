<template>
	<v-container>
		<v-data-table :headers="headers" :items="orders">
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Order</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-dialog v-model="dialog" max-width="500px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn color="success" class="mb-2" v-bind="attrs" v-on="on">
								New Order
							</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="text-h5">{{ formTitle }}</span>
							</v-card-title>
							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12">
											<v-text-field v-model="editedOrder.buyCount" label="Count"></v-text-field>
										</v-col>
										<v-col cols="12">
											<v-text-field v-model="editedOrder.productName" label="Name"></v-text-field>
										</v-col>
										<v-col cols="12">
											<v-text-field v-model="editedOrder.productUrl" label="Produkt-URL"></v-text-field>
										</v-col>
										<v-col cols="12">
											<v-select v-model="editedOrder.shopName" :items="shopItems" label="Shop"></v-select>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn @click="close">
									Cancel
								</v-btn>
								<v-btn class="success" @click="save">
									Save
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="text-h5">Are you sure you want to delete this Order?</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
								<v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>

			<template v-slot:[`item.productName`]="{ item }">
				<a :href="item.productUrl" target="_blank" v-if="item.productUrl">
					{{ item.productName }}
				</a>
				<template v-else>
					{{ item.productName }}
				</template>
			</template>
			
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon class="mr-3" @click="doneItem(item)">mdi-check</v-icon>
				<v-icon class="mr-3" @click="editItem(item)">mdi-pencil-outline</v-icon>
				<v-icon @click="deleteItem(item)">mdi-delete-outline</v-icon>
			</template>
		</v-data-table>
	</v-container>
</template>

<script>
import { getOrder, deleteOrder, updateOrder, createOrder, doneOrder } from '../api/order.api';

export default {
		name: 'Order',

		data: () => ({
			dialog: false,
			dialogDelete: false,
			headers: [
				{ text: 'Amount', value: 'buyCount' },
				{ text: 'Product', value: 'productName' },
				{ text: 'Shop', value: 'shopName' },
				{ value: 'actions', sortable: false, align: 'end' },
			],
			orders: [],
			shopItems: ['Conrad', 'Kabelscheune'],
			editedIndex: -1,
				editedOrder: {
						buyCount: 0,
						productName: '',
						productUrl: '',
						shopName: ''
				},
				defaultOrder: {
						buyCount: 0,
						productName: '',
						productUrl: '',
						shopName: ''
				},
		}),

		computed: {
			formTitle () {
				return this.editedIndex === -1 ? 'New Order' : 'Edit Order'
			},
		},

		watch: {
			dialog (val) {
				val || this.close()
			},
			dialogDelete (val) {
				val || this.closeDelete()
			},
		},

		created () {
			this.initialize()
		},

		methods: {
			async initialize () {
				const [error, data] = await getOrder();

				if (error) {
					console.log(error);
				} else {
					this.orders = data
				}
			},

			doneItem (item) {
				doneOrder(item.id);
				this.initialize();
			},

			editItem (item) {
				this.editedIndex = this.orders.indexOf(item)
				this.editedOrder = Object.assign({}, item)
				this.dialog = true
			},

			deleteItem (item) {
				this.editedIndex = this.orders.indexOf(item)
				this.editedOrder = Object.assign({}, item)
				this.dialogDelete = true
			},

			async deleteItemConfirm () {
				this.orders.splice(this.editedIndex, 1)
				await deleteOrder(this.editedOrder.id);
				this.initialize();
				this.closeDelete()
			},

			close () {
				this.dialog = false
				this.$nextTick(() => {
					this.editedOrder = Object.assign({}, this.defaultOrder)
					this.editedIndex = -1
				})
			},

			closeDelete () {
				this.dialogDelete = false
				this.$nextTick(() => {
					this.editedOrder = Object.assign({}, this.defaultOrder)
					this.editedIndex = -1
				})
			},

			async save () {
				if (this.editedIndex > -1) {
					await updateOrder(this.editedOrder.id, this.editedOrder);
					Object.assign(this.orders[this.editedIndex], this.editedOrder)
					this.initialize();
				} else {
					this.orders.push(this.editedOrder)
				await createOrder(this.editedOrder);
					this.initialize();
				}
				this.close()
			},
		},
}
</script>