<template>
	<v-container>
		<v-card>
			<v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
          <v-card-title class="white--text mt-8">
            <v-avatar size="56" color="primary">
							{{ this.avatar }}
            </v-avatar>
            <p class="ml-3">
              {{ this.fullname }}
            </p>
          </v-card-title>
        </v-img>
		</v-card>
	</v-container>
</template>

<script>
import { getUsers } from '../api/users.api';

export default {
	name: 'Profile',

	data: () => ({
		avatar: '',
		fullname: '',
	}),

	async created () {
		const [error, data] = await getUsers(this.$route.params.id);

		if (error) {
			console.log(error);
		} else {
			this.avatar = data.firstname.charAt(0) + data.lastname.charAt(0);
			this.fullname = data.firstname + ' ' + data.lastname;
		}
	}
}
</script>