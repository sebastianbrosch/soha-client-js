<template>
	<v-container>
		<v-data-table :headers="this.headersFile" :items="this.files">
			<template v-slot:[`item.mime`]="{ item }" >
					<v-icon v-if="item.mime == 'application/pdf'">mdi-file-pdf-outline</v-icon>
					<v-icon v-else>mdi-file-outline</v-icon>
	</template>
	<template v-slot:[`item.size`]="{ item }" >
		{{ getReadableFileSizeString(item.size) }}
	</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-btn v-if="item.static_filename" icon :href="`${getAPIFilePath}/${item.static_filename}`" :download="`${item.filename}`">
						<v-icon	>mdi-file-download-outline</v-icon>
					</v-btn>
					<v-btn icon @click="deleteFile(item)">
						<v-icon>mdi-delete-outline</v-icon>
					</v-btn>
		</template>
		</v-data-table>
			<form>
				<v-text-field v-model="description" label="Description"></v-text-field>
				<v-file-input v-model="file" accept=".exe"></v-file-input>
			<v-btn color="success" @click="saveFile">Save</v-btn>
		</form>
	</v-container>
</template>

<script>
import { createHardwareFile, deleteHardwareFile, getHardwareFiles } from '../api/hardware.api';
import { createSoftwareFile, deleteSoftwareFile, getSoftwareFiles } from '../api/software.api';

export default {
	name: 'Files',
	props: ['type', 'id'],

	data: () => ({
		description: '',
		file: null,
		files: [],
		headersFile: [
			{ value: 'mime', align: 'start', width: 15 },
			{ value: 'filename', text: 'File' },
			{ value: 'size', text: 'Size' },
			{ value: 'description', text: 'Description'},
			{ value: 'actions', align: 'end'}
		]
	}),

	computed: {
		getAPIFilePath () {
			return process.env.VUE_APP_API_FILES;
		}
	},

	created () {
		this.loadFiles();
	},

	methods: {
		getReadableFileSizeString(fileSizeInBytes) {
			var i = -1;
			var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
			do {
					fileSizeInBytes = fileSizeInBytes / 1024;
					i++;
			} while (fileSizeInBytes > 1024);

			return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
		},
		async loadFiles () {
			switch (this.type) {
				case 'software':
					this.loadSoftwareFiles();
					break;
				case 'hardware':
					this.loadHardwareFiles();
					break;
			}
		},
		async loadSoftwareFiles () {
			const [error, data] = await getSoftwareFiles(this.id);

			if (error) {
				console.log(error);
			} else {
				this.files = data;
			}
		},
		async loadHardwareFiles () {
			const [error, data] = await getHardwareFiles(this.id);

			if (error) {
				console.log(error);
			} else {
				this.files = data;
			}
		},
		async saveFile () {
			const formData = new FormData();

			if (this.file) {
				formData.append("file", this.file, this.file.name);
				formData.append('description', this.description);
				formData.append('size', this.file.size);
			}

			switch (this.type) {
				case 'software':
					await createSoftwareFile(this.id, formData);
					break;
				case 'hardware':
					await createHardwareFile(this.id, formData);
					break;
			}

			this.file = null;
			this.description = '';
			this.loadFiles();
		},
		async deleteFile (file) {
			switch (this.type) {
				case 'software':
					await deleteSoftwareFile(this.id, file.id);
					break;
				case 'hardware':
					await deleteHardwareFile(this.id, file.id);
					break;
			}
			this.loadFiles();
		}
	}
}
</script>