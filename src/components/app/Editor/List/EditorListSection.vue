<template>
	<div class="mt-2">
		<SwitchCheckbox
			v-if="editing"
			v-model="hasElementList"
			:title="`Add a ${sectionTemplate.subsectionElement}`"
		/>
		<editor-elements
			:section-template="sectionTemplate"
			v-if="hasElementList"
		/>
	</div>
</template>

<script setup lang="ts">
	import { inject, onMounted, ref, watch, type PropType } from 'vue';
	import { Subsection } from '../../../../models/Subsection';
	import SwitchCheckbox from '../../../shared/checkbox/SwitchCheckbox.vue';
	import EditorElements from './EditorElements.vue';
	import type { SectionTemplate } from '../../../../models/SectionTemplate';
	const editing = inject('editing', false);
	const hasElementList = ref(false);
	const subsection = inject('subsection', new Subsection());
	defineProps({
		sectionTemplate: {
			type: Object as PropType<SectionTemplate>,
			required: true,
		},
	});
	const updatedHasElementList = (subsection: Subsection) => {
		return (hasElementList.value = subsection.elements.length > 0);
	};
	onMounted(() => {
		hasElementList.value = updatedHasElementList(subsection);
	});
	watch(
		() => subsection,
		(subsection: Subsection) => {
			hasElementList.value = updatedHasElementList(subsection);
		},
		{ deep: true }
	);
</script>
