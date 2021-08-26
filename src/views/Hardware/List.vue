<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="hardware"
			:search="search"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Hardware</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Search"
						single-line
						hide-details
						class="shrink mx-12"
						style="width:300px;"
					></v-text-field>
					<v-btn class="ml-6 success" to="/hardware/new">New Hardware</v-btn>
				</v-toolbar>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon class="mr-3" @click="editItem(item)">mdi-pencil-outline</v-icon>
				<v-icon @click="deleteItem(item)">mdi-delete-outline</v-icon>
			</template>
		</v-data-table>
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
		},
	}
}
</script>