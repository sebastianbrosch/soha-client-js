<template>
	<v-container>
		<v-card flat>
			<v-card-title>
				Hardware
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
				></v-text-field>
				<v-btn class="mt-2 ms-4 success" to="/hardware/new">New Hardware</v-btn>
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="hardware"
				:search="search"
			>
				<template v-slot:[`item.actions`]="{ item }">
					<v-icon class="mr-3" @click="editItem(item)">mdi-pencil-outline</v-icon>
					<v-icon @click="deleteItem(item)">mdi-delete-outline</v-icon>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
import { getHardware, deleteHardware } from '../../api/hardware.api';

export default {
	name: 'Hardware',

	data: () => ({
		headers: [
			{ text: 'Name', value: 'name' },
			{ text: 'Serial-Number', value: 'serialnumber' },
			{ text: 'Type', value: 'type' },
			{ text: 'Purchased', value: 'purchaseDate'},
			{ text: 'Archive', value: 'offlineArchive' },
			{ text: 'State', value: 'state' },
			{ value: 'actions', sortable: false, align: 'end' },
		],
		hardware: [],
		search: '',
	}),

	created () {
		this.load();
	},

	methods: {
		async load () {
			const [error, data] = await getHardware();

			if (error) {
				console.log(error);
			} else {
				this.hardware = data;
			}
		},
		async deleteItem (hardware) {
			await deleteHardware(hardware.id);
			await this.load();
		},
		async editItem (hardware) {
			this.$router.push(`/hardware/edit/${hardware.id}`);
		}
	}
}
</script>