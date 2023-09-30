<template>
	<SubsectionAlign>
		<div class="justify-left flex items-center">
			<BasicButton
				class="w-24"
				name="Edit"
				aria-label="Edit Resume"
				:active="isEditingResume"
				@click="
					() => {
						isEditingResume = true;
					}
				"
			/>
			<BasicButton
				class="w-24"
				name="Preview"
				aria-label="Preview Resume"
				:active="!isEditingResume"
				@click="
					() => {
						isEditingResume = false;
					}
				"
			/>
		</div>
	</SubsectionAlign>
</template>

<script lang="ts">
	import SubsectionAlign from '../../shared/Subsection/SubsectionAlign.vue';
	import BasicButton from '../../shared/Button/BasicButton.vue';

	export default {
		props: {
			modelValue: {
				type: Boolean,
				required: true,
			},
		},
		components: { SubsectionAlign, BasicButton },
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
