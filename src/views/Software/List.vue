<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="software"
			:search="search"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Software</v-toolbar-title>
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
					<v-btn class="ml-6 success" to="/software/new">New Software</v-btn>
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