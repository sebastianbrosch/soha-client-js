<template>
	<v-container>
		<v-card flat>
			<v-card-title>
				{{ title }}
			</v-card-title>
			<v-form>
				<v-container>
					<v-row>
						<v-col cols="12" md="6">
							<v-text-field v-model="user.email" label="E-Mail" required></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field v-model="user.password" label="Password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" required></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12" md="6">
							<v-text-field v-model="user.firstname" label="Firstname" required></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field v-model="user.lastname" label="Lastname" required></v-text-field>
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
	</v-container>
</template>

<script>
import { createUser, getUsers, updateUser } from '../../api/users.api';

export default {
	name: 'User',

	data: () => ({
		state: ['active', 'inactive'],
		user: {
			email: '',
			password: '',
			firstname: '',
			lastname: '',
		},
		showPassword: false,
	}),

	computed: {
		title () {
			return `${this.$route.params.id ? 'Edit ' : 'New '} User`;
		}
	},

	async created () {
		if (this.$route.params.id) {
			const [error, data] = await getUsers(this.$route.params.id);

			if (error) {
				console.log(error);
			} else {
				this.user = data;
				this.user.password = null;
			}
		}
	},

	methods: {
		async save () {
			if (this.$route.params.id) {
				await updateUser(this.user.id, this.user);
			} else {
				await createUser(this.user);
			}
			this.$router.push({ path: '/users' });
		},
		cancel () {
			this.$router.push({ path: '/users' });
		}
	}
}
</script>