<template>
	<div class="tabs -mb-px">
		<button
			class="tab tab-lifted tab-lg [--tab-border-color:transparent]"
			:class="{ 'tab-active': isEditingResume }"
			@click="isEditingResume = true"
		>
			Edit
		</button>
		<button
			class="tab tab-lifted tab-lg [--tab-border-color:transparent]"
			:class="{ 'tab-active': !isEditingResume }"
			@click="isEditingResume = false"
		>
			Preview
		</button>
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
