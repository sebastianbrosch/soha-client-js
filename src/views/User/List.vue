<template>
	<v-container>
		<v-data-table
			:headers="headers"
			:items="users"
		>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Users</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn class="ml-6 success" to="/users/new">New User</v-btn>
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
import { deleteUser, getUsers } from '../../api/users.api'

export default {
	name: 'User',

	created () {
		this.load();
	},

	data: () => ({
		headers: [
			{ text: 'E-Mail', value: 'email' },
			{ text: 'Firstname', value: 'firstname' },
			{ text: 'Lastname', value: 'lastname' },
			{ value: 'actions', sortable: false, align: 'end' },
		],
		users: [],
	}),

	methods: {
		async load () {
			const [error, data] = await getUsers();

			if (error) {
				console.log(error);
			} else {
				this.users = data;
			}
		},
		async deleteItem (user) {
			await deleteUser(user.id);
			await this.load();
		},
		async editItem (user) {
			this.$router.push(`/users/edit/${user.id}`);
		}
	}
}
</script>