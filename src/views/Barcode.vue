<template>
	<v-container>
		<v-card flat>
			<v-card-title>
				Scan a Barcode
			</v-card-title>
			<v-card-text>
				<v-btn @click="onBtnClick">Barcode</v-btn>
				<div>Code: {{code}}; Format: {{format}}</div>
			</v-card-text>
		</v-card>
		<barcode-scanner ref="dlg" title="Dialog" message="Message"></barcode-scanner>
	</v-container>
</template>

<script>
import BarcodeScanner from '../components/BarcodeScanner.vue';

export default {
	name: 'Barcode',

	components: {
		BarcodeScanner
	},

	data: () => ({
		code: '',
		format: ''
	}),

	methods: {
		async onBtnClick () {
			this.$refs.dlg.open().then(result => {
        console.log("Result: ", result);
				this.code = result.code,
				this.format = result.format
      }).catch(error => {
				console.log("Error: ", error);
			});
		}
	}
}
</script>