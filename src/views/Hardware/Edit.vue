<template>
	<v-container>
<v-card flat>
			<v-card-title>
				{{ title }}
			</v-card-title>
			<v-form>
				<v-container>
					<v-row>
						<v-col
							cols="12"
							md="4"
						>
							<v-text-field
								v-model="hardware.name"
								label="Name"
								required
							></v-text-field>
						</v-col>
						<v-col
							cols="12"
							md="4"
						>
							<v-text-field
								v-model="hardware.serialnumber"
								label="Serial Number"
								required
								:append-icon="'mdi-barcode-scan'"
								@click:append="ScanBarcodeSerialNumber"
							></v-text-field>
						</v-col>
						<v-col
							cols="12"
							md="4"
						>
							<v-select
								:items="type"
								v-model="hardware.type"
								label="Type"
								required
							></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col
							cols="12"
							md="4"
						>
							<v-text-field
								v-model="hardware.purchaseDate"
								label="Purchase Date"
							></v-text-field>
						</v-col>
						<v-col
							cols="12"
							md="4"
						>
							<v-text-field
								v-model="hardware.warrantyDate"
								label="Warranty Date"
							></v-text-field>
						</v-col>
						<v-col
							cols="12"
							md="4"
						>
							<v-select
								:items="state"
								v-model="hardware.state"
								label="State"
								required
							></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col
							cols="12"
							md="4"
						>
							<v-text-field
								v-model="hardware.offlineArchive"
								label="Offline Archive"
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col
							cols="12"
							md="12"
						>
							<v-btn class="success mr-2" @click="save">
								Save
							</v-btn>
							<v-btn @click="cancel">
								Cancel
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</v-card>
		<barcode-scanner ref="dlg" title="Dialog" message="Message"></barcode-scanner>
	</v-container>
</template>

<script>
import { createHardware, getHardware, updateHardware } from '../../api/hardware.api';
import BarcodeScanner from '../../components/BarcodeScanner.vue';

export default {
	name: 'Hardware',

	components: {
		BarcodeScanner
	},

	data: () => ({
		state: ['active', 'inactive'],
		type: ['Computer', 'Laptop', 'Printer', 'Switch', 'Server', 'Other'],
		hardware: {
			name: '',
			serialnumber: '',
			type: '',
			purchaseDate: null,
			warrantyDate: null,
			state: 'active',
			offlineArchive: null,
		},
	}),

	computed: {
		title () {
			return `${this.$route.params.id ? 'Edit ' : 'New '} Hardware`;
		}
	},

	async created () {
		if (this.$route.params.id) {
			const [error, data] = await getHardware(this.$route.params.id);

			if (error) {
				console.log(error);
			} else {
				this.hardware = data;
			}
		}
	},

	methods: {
		async save () {
			if (this.$route.params.id) {
				await updateHardware(this.hardware.id, this.hardware);
			} else {
				await createHardware(this.hardware);
			}
			this.$router.push({ path: '/hardware' });
		},
		cancel () {
			this.$router.push({ path: '/hardware' });
		},
		ScanBarcodeSerialNumber () {
			this.$refs.dlg.open().then(result => {
				this.hardware.serialnumber = result.code;
      }).catch(error => {
				console.log("Error: ", error);
			});
		}
	}
}
</script>