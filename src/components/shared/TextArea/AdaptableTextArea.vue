<template>
	<textarea
		ref="textarea"
		v-model="value"
		class="resize-none overflow-hidden focus:outline-none"
		rows="1"
		@input="changeTextArea"
	></textarea>
</template>

<script lang="ts">
	export default {
		props: {
			modelValue: {
				type: String,
				default: '',
			},
		},
		mounted() {
			this.changeTextArea();
		},
		methods: {
			changeTextArea() {
				var textArea = this.$refs.textarea as HTMLInputElement | null;

				if (textArea) {
					textArea.style.height = '0px';
					textArea.style.height = textArea?.scrollHeight + 'px';
				}
			},
		},
		computed: {
			value: {
				get() {
					return this.modelValue;
				},
				set(value: string) {
					this.$emit('update:modelValue', value);
				},
			},
		},
	};
</script>
