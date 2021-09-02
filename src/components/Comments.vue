<template>
	<v-container>
		<form>
			<VueEditor class="mb-4" v-model="content" :editor-toolbar="editorToolbar" />
			<v-btn color="success" @click="saveComment">Save</v-btn>
		</form>
		<v-divider class="my-4"></v-divider>
		<v-list two-line >
			<v-list-item v-for="(comment) in this.comments" :key="comment.id">
				<v-list-item-avatar color="indigo">
					<span class="white--text text-h6" v-if="!!comment.User">{{ comment.User.firstname.charAt(0) }}{{comment.User.lastname.charAt(0)}}</span>
					<span class="white--text text-h6" v-else>A</span>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-if="comment.User" class="text--secondary subtitle-2">
						{{ comment.User.firstname }} {{ comment.User.lastname }} am {{ GetFormattedDate(comment.createdAt) }}
						<v-btn icon @click="deleteComment(comment)">
							<v-icon>mdi-delete-outline</v-icon>
						</v-btn>
					</v-list-item-title>
					<v-list-item-title v-else class="text--secondary subtitle-2">
						Anonym am {{ GetFormattedDate(comment.createdAt) }}
						<v-btn icon @click="deleteComment(comment)">
							<v-icon>mdi-delete-outline</v-icon>
						</v-btn>
					</v-list-item-title>
					<v-list-item-subtitle class="text--primary body-1" v-html="comment.content"></v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-container>
</template>

<script>
import { createSoftwareComment, deleteSoftwareComment, getSoftwareComments } from '../api/software.api';
import { createHardwareComment, deleteHardwareComment, getHardwareComments } from '../api/hardware.api';
import { VueEditor } from "vue2-editor";

export default {
	name: 'Comments',
	props: ['type', 'id'],

	components: {
		VueEditor
	},

	computed: {
		getUser () {
			return this.$store.state.user;
		}
	},

	data: () => ({
		comments: [],
		content: '',
		editorToolbar: [
			["bold", "italic", "underline"]
		],
	}),

	created () {
		this.loadComments();
	},

	methods: {
		async loadComments () {
			switch (this.type) {
				case 'hardware':
					this.loadHardwareComments();
					break;
				case 'software':
					this.loadSoftwareComments();
					break;
			}
		},
		async loadHardwareComments () {
			const [error, data] = await getHardwareComments(this.id);

			if (error) {
				this.comments = [];
				console.log(error);
			} else {
				this.comments = data;
			}
		},
		async loadSoftwareComments () {
			const [error, data] = await getSoftwareComments(this.id);

			if (error) {
				this.comments = [];
				console.log(error);
			} else {
				this.comments = data;
			}
		},
		async deleteComment (comment) {
			switch (this.type) {
				case 'hardware':
					await deleteHardwareComment(this.id, comment.id);
					break;
				case 'software':
					await deleteSoftwareComment(this.id, comment.id);
					break;
			}

			this.loadComments();
		},
		async saveComment () {
			const comment = {
				content: this.content,
				userId: this.getUser ? this.getUser.id : null
			};

			switch (this.type) {
				case 'hardware':
					await createHardwareComment(this.id, comment);
					break;
				case 'software':
					await createSoftwareComment(this.id, comment);
					break;
			}

			this.content = '';
			this.loadComments();
		},
		GetFormattedDate(strDate) {
      const objDate = new Date(strDate);
      const arrDate = [('0' + objDate.getDate()).slice(-2), ('0' + (objDate.getMonth()+1)).slice(-2), objDate.getFullYear()];
      const arrTime = [('0' + objDate.getHours()).slice(-2), ('0' + objDate.getMinutes()).slice(-2), ('0' + objDate.getSeconds()).slice(-2)];
      return arrDate.join('.') + ' ' + arrTime.join(':');
    },
	}
}
</script>