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
								v-model="software.name"
								label="Name"
								required
							></v-text-field>
						</v-col>
						<v-col
							cols="12"
							md="4"
						>
							<v-text-field
								v-model="software.licenseKey"
								label="License Key"
								required
							></v-text-field>
						</v-col>
						<v-col
							cols="12"
							md="4"
						>
							<v-text-field
								v-model="software.licenseAmount"
								label="License Amount"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col
							cols="12"
							md="4"
						>
							<v-text-field
								v-model="software.offlineArchive"
								label="Offline Archive"
							></v-text-field>
						</v-col>
						<v-col
							cols="12"
							md="4"
						>
							<v-text-field
								v-model="software.expiredAt"
								label="Expired At"
							></v-text-field>
						</v-col>
						<v-col
							cols="12"
							md="4"
						>
							<v-select
								:items="state"
								v-model="software.state"
								required
							></v-select>
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
	</v-container>
</template>

<script>
import { createSoftware, getSoftware, updateSoftware } from '../../api/software.api';

export default {
	name: 'Software',

	data: () => ({
		state: ['active', 'inactive'],
		software: {
			name: '',
			licenseType: '',
			licenseKey: '',
			licenseAmount: 0,
			state: 'active',
			expiredAt: null,
			offlineArchive: null,
		},
	}),

	computed: {
		title () {
			return `${this.$route.params.id ? 'Edit ' : 'New '} Software`;
		}
	},

	async created () {
		if (this.$route.params.id) {
			const [error, data] = await getSoftware(this.$route.params.id);

			if (error) {
				console.log(error);
			} else {
				this.software = data;
			}
		}
	},

	methods: {
		async save () {
			if (this.$route.params.id) {
				await updateSoftware(this.software.id, this.software);
			} else {
				await createSoftware(this.software);
			}
			this.$router.push({ path: '/software' });
		},
		cancel () {
			this.$router.push({ path: '/software' });
		}
	}
}
</script>