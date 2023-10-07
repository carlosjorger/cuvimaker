<template>
	<div class="tabs">
		<a
			class="tab tab-lifted"
			:class="{ 'tab-active': isEditingResume }"
			@click="isEditingResume = true"
			>Edit</a
		>
		<a
			class="tab tab-lifted"
			:class="{ 'tab-active': !isEditingResume }"
			@click="isEditingResume = false"
			>Preview</a
		>
	</div>
</template>

<script lang="ts">
	export default {
		props: {
			modelValue: {
				type: Boolean,
				required: true,
			},
		},
		computed: {
			isEditingResume: {
				get() {
					return this.modelValue;
				},
				set(value: boolean) {
					this.$emit('update:modelValue', value);
				},
			},
		},
	};
</script>

<style lang="scss" scoped></style>
