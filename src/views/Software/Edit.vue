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
								v-model="software.expiresAt"
								label="Expires At"
							></v-text-field>
						</v-col>
						<v-col
							cols="12"
							md="4"
						>
							<v-select
								:items="state"
								v-model="software.state"
								label="State"
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
		<v-tabs
			class="mt-4"
			color="deep-purple accent-4"
			v-if="!!this.$route.params.id"
		>
			<v-tab>Comments</v-tab>
			<v-tab>Users</v-tab>
			<v-tab>Files</v-tab>
			<v-tab>Documents</v-tab>
		
			<v-tab-item>
				<Comments :id="this.$route.params.id" type="software"></Comments>
			</v-tab-item>
			<v-tab-item>

			</v-tab-item>
			<v-tab-item>
				<Files :id="this.$route.params.id" type="software"></Files>
			</v-tab-item>
			<v-tab-item>
				<Documents :id="this.$route.params.id" type="software"></Documents>
			</v-tab-item>
		</v-tabs>
	</v-container>
</template>

<script>
import { createSoftware, getSoftware, updateSoftware } from '../../api/software.api';
import Comments from '../../components/Comments.vue';
import Files from '../../components/Files.vue';
import Documents from '../../components/Documents.vue';

export default {
	name: 'Software',

	components: {
		Comments,
		Files,
		Documents
	},

	data: () => ({
		state: ['active', 'inactive'],
		software: {
			name: '',
			licenseKey: '',
			licensePassword: '',
			licenseAmount: 0,
			offlineArchive: null,
			state: 'active',
			expiresAt: null,
		},
	}),

	computed: {
		title () {
			return `${this.$route.params.id ? 'Edit ' : 'New '} Software`;
		}
	},

	async created () {
		this.loadSoftwareItems();
	},

	methods: {
		async loadSoftwareItems () {
			if (this.$route.params.id) {
				const [error, data] = await getSoftware(this.$route.params.id);
	
				if (error) {
					console.log(error);
				} else {
					this.software = data;
				}
			}
		},
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
		},
	}
}
</script>