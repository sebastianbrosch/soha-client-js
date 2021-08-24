<template>
	<v-container>
		<v-card flat>
			<v-card-title>
				Software
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
				></v-text-field>
				<v-btn class="mt-2 ms-4 success" to="/software/new">New Software</v-btn>
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="software"
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
import { getSoftware, deleteSoftware } from '../../api/software.api';

export default {
	name: 'Software',

	data: () => ({
		headers: [
			{ text: 'Name', value: 'name' },
			{ text: 'Devices', value: 'licenseAmount' },
			{ text: 'License', value: 'licenseKey' },
			{ text: 'Archive', value: 'offlineArchive' },
			{ text: 'State', value: 'state' },
			{ value: 'actions', sortable: false, align: 'end' },
		],
		software: [],
		search: '',
	}),

	created () {
		this.load();
	},

	methods: {
		async load () {
			const [error, data] = await getSoftware();
	
			if (error) {
				console.log(error);
			} else {
				this.software = data;
			}
		},
		async deleteItem (software) {
			await deleteSoftware(software.id);
			await this.load();
		},
		async editItem (software) {
			this.$router.push(`/software/edit/${software.id}`);
		}
	}
}
</script>