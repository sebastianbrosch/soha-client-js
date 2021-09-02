<template>
	<v-container>
		<v-card flat>
			<v-card-title>
				{{ title }}
			</v-card-title>
			<v-form>
				<v-container>
					<v-row>
						<v-col cols="12" md="4">
							<v-text-field v-model="hardware.description" label="Description" required></v-text-field>
						</v-col>
						<v-col cols="12" md="4">
							<v-text-field v-model="hardware.serialnumber" label="Serial Number" required :append-icon="'mdi-barcode-scan'" @click:append="ScanBarcodeSerialNumber"></v-text-field>
						</v-col>
						<v-col cols="12" md="4">
							<v-select :items="type" v-model="hardware.deviceType" label="Type" required></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" md="4">
							<v-text-field v-model="hardware.purchasedAt" label="Purchased At"></v-text-field>
						</v-col>
						<v-col cols="12" md="4">
							<v-text-field v-model="hardware.warrantyAt" label="Warranty Date"></v-text-field>
						</v-col>
						<v-col cols="12" md="4">
							<v-select :items="state" v-model="hardware.state" label="State" required></v-select>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" md="4">
							<v-text-field v-model="hardware.offlineArchive" label="Offline Archive"></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" md="12">
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
		<v-tabs class="mt-4" color="deep-purple accent-4" v-if="!!this.$route.params.id">
			<v-tab>Comments</v-tab>
			<v-tab>Users</v-tab>
			<v-tab>Files</v-tab>
			<v-tab>Documents</v-tab>
			<v-tab>Barcodes</v-tab>
			<v-tab-item>
				<Comments :id="this.$route.params.id" type="hardware"></Comments>
			</v-tab-item>
			<v-tab-item>

			</v-tab-item>
			<v-tab-item>
				<Files :id="this.$route.params.id" type="hardware"></Files>
			</v-tab-item>
			<v-tab-item>
				<Documents :id="this.$route.params.id" type="hardware"></Documents>
			</v-tab-item>
			<v-tab-item>
				<Barcodes :id="this.$route.params.id" type="hardware"></Barcodes>
			</v-tab-item>
		</v-tabs>
	</v-container>
</template>

<script>
import { createHardware, getHardware, updateHardware } from '../../api/hardware.api';
import BarcodeScanner from '../../components/BarcodeScanner.vue';
import Comments from '../../components/Comments.vue';
import Files from '../../components/Files.vue';
import Documents from '../../components/Documents.vue';
import Barcodes from '../../components/Barcodes.vue';

export default {
	name: 'Hardware',

	components: {
		BarcodeScanner,
		Comments,
		Files,
		Documents,
		Barcodes
	},

	data: () => ({
		state: ['active', 'inactive', 'spare', 'corrupted'],
		type: ['Notebook', 'Router', 'Switch', 'Printer', 'Monitor', 'Computer', 'Hard Disk - External', 'Hard Disk - Internal', 'IP telephone'],
		hardware: {
			description: '',
			serialnumber: '',
			deviceType: '',
			purchasedAt: null,
			warrantyAt: null,
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