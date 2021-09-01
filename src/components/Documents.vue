<template>
	<v-container>
		<v-data-table :headers="this.headersDocuments" :items="this.documents">
			<template v-slot:[`item.mime`]="{ item }" >
				<v-icon v-if="item.mime == 'application/pdf'">mdi-file-pdf-outline</v-icon>
				<v-icon v-else>mdi-file-outline</v-icon>
			</template>
			<template v-slot:[`item.size`]="{ item }" >
				{{ getReadableFileSizeString(item.size) }}
			</template>
			<template v-slot:[`item.tags`]="{ item }" >
				<v-chip small class="mr-2" v-for="type in splitItems(item.tags)" :key="type">{{ type }}</v-chip>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-btn v-if="item.static_filename" icon :href="`${getAPIDocumentPath}/${item.static_filename}`" target="_blank" :download="`${item.filename}`">
					<v-icon	>mdi-file-eye-outline</v-icon>
				</v-btn>
				<v-btn icon @click="deleteDocument(item)">
					<v-icon >mdi-delete-outline</v-icon>
				</v-btn>
			</template>
		</v-data-table>
		<form>
			<v-select
				v-model="tags"
				:items="states"
				:menu-props="{ maxHeight: '400' }"
				label="Type of Document"
				multiple
				persistent-hint
			></v-select>
			<v-file-input v-model="document" accept=".pdf"></v-file-input>
			<v-btn color="success" @click="saveDocument"><v-icon left>mdi-content-save-outline</v-icon>Save</v-btn>
		</form>
	</v-container>
</template>

<script>
import { createHardwareDocument, deleteHardwareDocument, getHardwareDocuments } from '../api/hardware.api';
import { createSoftwareDocument, deleteSoftwareDocument, getSoftwareDocuments } from '../api/software.api';

export default {
	name: 'Documents',
	props: ['type', 'id'],

	data: () => ({
		documents: [],
		document: null,
		headersDocuments: [
			{ value: 'mime', align: 'start', width: 15 },
			{ value: 'filename', text: 'Datei', align: 'start' },
			{ value: 'size', text: 'Size' },
			{ value: 'tags', text: 'Tags' },
			{ value: 'actions', align: 'end' }
		],
		states: ['Rechnung', 'Lieferschein', 'Dokumentation', 'Anleitung', 'Lizenzinformation'],
		tags: [],
	}),

	computed: {
		getAPIDocumentPath () {
			return process.env.VUE_APP_API_DOCUMENTS;
		}
	},

	created () {
		this.loadDocuments();
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
		splitItems(items) {
			if (items) {
				return items.split(';');
			} else {
				return '';
			}
		},
		async loadDocuments () {
			switch (this.type) {
				case 'software':
					this.loadSoftwareDocuments();
					break;
				case 'hardware':
					this.loadHardwareDocuments();
					break;
			}
		},
		async loadSoftwareDocuments () {
			const [error, data] = await getSoftwareDocuments(this.id);

			if (error) {
				console.log(error);
			} else {
				this.documents = data;
			}
		},
		async loadHardwareDocuments () {
			const [error, data] = await getHardwareDocuments(this.id);

			if (error) {
				console.log(error);
			} else {
				this.documents = data;
			}
		},
		async saveDocument () {
			const formData = new FormData();

			if (this.document) {
				formData.append("document", this.document, this.document.name);
				formData.append("tags", this.tags.join(';'));
				formData.append("size", this.document.size);
			}

			switch (this.type) {
				case 'software':
					await createSoftwareDocument(this.id, formData);
					break;
				case 'hardware':
					await createHardwareDocument(this.id, formData);
					break;
			}

			this.document = null;
			this.tags = [];
			this.loadDocuments();
		},
		async deleteDocument (document) {
			switch (this.type) {
				case 'software':
					await deleteSoftwareDocument(this.id, document.id);
					break;
				case 'hardware':
					await deleteHardwareDocument(this.id, document.id);
					break;
			}
			this.loadDocuments();
		}
	}
}
</script>