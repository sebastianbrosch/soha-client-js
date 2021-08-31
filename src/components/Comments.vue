<template>
<v-container>
	<form>
					<template>
						<VueEditor class="mb-4" v-model="content" :editor-toolbar="editorToolbar" />
					</template>
					<v-btn color="success" @click="saveComment">Save</v-btn>
			</form>
			<v-divider class="my-4"></v-divider>
		<v-list two-line>
					<template v-for="(comment) in this.comments">

						<v-list-item

							:key="comment.id"
						>
							<v-list-item-avatar>
								<v-img src="https://i.pravatar.cc/150"></v-img>
							</v-list-item-avatar>

							<v-list-item-content>
								<v-list-item-title v-if="comment.User" class="text--secondary subtitle-2">{{ comment.User.firstname }} {{ comment.User.lastname }} am {{ GetFormattedDate(comment.createdAt) }} <v-btn icon @click="deleteComment(comment)"><v-icon >mdi-delete-outline</v-icon></v-btn></v-list-item-title>
								<v-list-item-title v-else class="text--secondary subtitle-2">Anonym am {{ GetFormattedDate(comment.createdAt) }} <v-btn icon @click="deleteComment(comment)"><v-icon >mdi-delete-outline</v-icon></v-btn></v-list-item-title>
								<v-list-item-subtitle class="text--primary body-1" v-html="comment.content"></v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list>
				
		</v-container>
</template>

<script>
import { getSoftwareComments, deleteSoftwareComment, createSoftwareComment } from '../api/software.api';
import { getHardwareComments, deleteHardwareComment, createHardwareComment } from '../api/hardware.api';
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
		editorToolbar: [
			["bold", "italic", "underline"],
			[{ list: "ordered" }, { list: "bullet" }]
		],
		content: '',
	}),

	created () {
		this.loadComments();
	},

	methods: {
		async loadComments () {
			if (this.type === 'software') {
				const [error, data] = await getSoftwareComments(this.id);

				if (error) {
					console.log(error);
				} else {
					this.comments = data;
				}
			} else if (this.type === 'hardware') {
				const [error, data] = await getHardwareComments(this.id);

				if (error) {
					console.log(error);
				} else {
					this.comments = data;
				}
			}
		},
		GetFormattedDate(strDate) {
      const objDate = new Date(strDate);
      const arrDate = [('0' + objDate.getDate()).slice(-2), ('0' + (objDate.getMonth()+1)).slice(-2), objDate.getFullYear()];
      const arrTime = [('0' + objDate.getHours()).slice(-2), ('0' + objDate.getMinutes()).slice(-2), ('0' + objDate.getSeconds()).slice(-2)];
      return arrDate.join('.') + ' ' + arrTime.join(':');
    },
		async deleteComment (comment) {
			if (this.type === 'software') {
				await deleteSoftwareComment(this.id, comment.id);
			} else if (this.type === 'hardware') {
				await deleteHardwareComment(this.id, comment.id);
			}
			this.loadComments();
		},
		async saveComment () {
			const user = this.getUser;

			if (this.type === 'software') {
				if (user) {
					await createSoftwareComment(this.id, {
						content: this.content,
						userId: user.id
					});
				} else {
					await createSoftwareComment(this.id, {
						content: this.content
					});
				}
			} else if (this.type === 'hardware') {
				if (user) {
					await createHardwareComment(this.id, {
						content: this.content,
						userId: user.id
					});
				} else {
					await createHardwareComment(this.id, {
						content: this.content
					});
				}
			}

			this.content = '';
			this.loadComments();
		}
	}
}
</script>