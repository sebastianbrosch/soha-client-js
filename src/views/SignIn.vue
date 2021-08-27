<template>
<v-app>
	<v-layout align-center justify-center>
		<v-flex xs12 sm8 md4>
			<v-form @submit.prevent="signin">
				<v-card >
					<v-card-text>
						<v-text-field
							prepend-icon="mdi-account-outline"
							name="email"
							label="E-Mail"
							type="text"
							v-model="email"
						></v-text-field>
						<v-text-field
							prepend-icon="mdi-lock-outline"
							name="password"
							label="Password"
							type="password"
							v-model="password"
						></v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="success" class="px-4" type="submit">Login</v-btn>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-flex>
	</v-layout>	
	</v-app>
</template>

<script>
import { signin } from '../api/auth.api';

export default {
	name: 'SignIn',

	data: () => ({
		email: '',
		password: '',
	}),

	methods: {
		async signin() {
			const credentials = {
				email: this.email,
				password: this.password
			};

			const [error, response] = await signin(credentials);

			if (error) {
				console.log(error);
			} else {
				const token = response.token;
				const user = response.user;
	
				this.$store.dispatch('login', { token, user });
				this.$router.push('/');
			}
		}
	}
}
</script>