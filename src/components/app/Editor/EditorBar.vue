<!-- TODO: add more space to editor -->
<template>
	<SubsectionAlign>
		<div class="justify-left flex items-center">
			<BasicButton
				class="m-1 w-32"
				name="Edit"
				:active="isEditingResume"
				@click="
					() => {
						isEditingResume = true;
					}
				"
			/>
			<BasicButton
				class="m-1 w-32"
				name="Preview"
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
