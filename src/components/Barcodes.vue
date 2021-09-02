<template>
	<v-container>
		<v-data-table :headers="this.headersBarcodes" :items="this.barcodes">
			<template v-slot:[`item.actions`]="{ item }">
				<v-btn icon @click="deleteBarcode(item)">
					<v-icon>mdi-delete-outline</v-icon>
				</v-btn>
			</template>
		</v-data-table>
		<v-row>
			<v-col cols="12" md="6">
				<v-text-field v-model="code" label="Code"></v-text-field>
			</v-col>
			<v-col cols="12" md="6">
				<v-text-field v-model="format" label="Format"></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" md="12">
				<v-text-field v-model="description" label="Description"></v-text-field>
			</v-col>
		</v-row>
		<barcode-scanner ref="barcode" title="Dialog" message="Message"></barcode-scanner>
		<v-btn color="secondary" @click="scanBarcode" class="mr-4">Scan Barcode</v-btn>
		<v-btn color="success" @click="saveBarcode" :disabled="!(!!this.format)">Save</v-btn>
	</v-container>
</template>

<script>
import { getHardwareBarcodes, createHardwareBarcode, deleteHardwareBarcode } from '../api/hardware.api';
import BarcodeScanner from '../components/BarcodeScanner.vue';

export default {
	name: 'Barcodes',
	props: ['type', 'id'],

	components: {
		BarcodeScanner
	},

	data: () => ({
		barcodes: [],
		headersBarcodes: [
			{ value: 'code', text: 'Code', align: 'start' },
			{ value: 'format', text: 'Format' },
			{ value: 'description', text: 'Description' },
			{ value: 'actions', align: 'end' }
		],
		format: '',
		code: '',
		description: '',
	}),

	async created () {
		this.loadBarcodes();
	},

	methods: {
		async loadBarcodes () {
			const [error, data] = await getHardwareBarcodes(this.id);

			if (error) {
				this.barcodes = [];
				console.log(error);
			} else {
				this.barcodes = data;
			}
		},
		scanBarcode () {
			this.$refs.barcode.open().then(result => {
				this.code = result.code;
				this.format = result.format;
			}).catch(error => {
				console.log(error);
			});
		},
		async saveBarcode () {
			await createHardwareBarcode(this.id, {
				format: this.format,
				barcode: this.code,
				description: this.description
			});

			this.format = '';
			this.code = '';
			this.description = '';
			this.loadBarcodes();
		},
		async deleteBarcode (barcode) {
			await deleteHardwareBarcode(this.id, barcode.id);
			this.loadBarcodes();
		}
	}
}
</script>