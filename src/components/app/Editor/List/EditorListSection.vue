<template>
	<div class="mx-2 mt-2">
		<SwitchCheckbox
			v-if="editing"
			v-model="hasElementList"
			:title="'Add a List'"
		/>
		<editor-elements v-if="hasElementList" />
	</div>
</template>

<script lang="ts">
	import { inject } from 'vue';
	import { Subsection } from '../../../../models/Subsection';
	import SwitchCheckbox from '../../../shared/checkbox/SwitchCheckbox.vue';
	import EditorElements from './EditorElements.vue';
	export default {
		name: 'EditorListSection',
		components: { SwitchCheckbox, EditorElements },

		data() {
			return {
				editing: inject('editing', false),
				hasElementList: false,
				subsection: inject('subsection', new Subsection()),
			};
		},
		mounted() {
			this.hasElementList = this.updatedHasElementList(this.subsection);
		},
		methods: {
			updatedHasElementList(subsection: Subsection) {
				return (this.hasElementList = subsection.elements.length > 0);
			},
		},
		watch: {
			subsection(subsection: Subsection) {
				this.hasElementList = this.updatedHasElementList(subsection);
			},
		},
	};
</script>

<style scoped></style>
