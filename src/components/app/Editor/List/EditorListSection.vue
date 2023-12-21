<template>
	<div class="mt-2">
		<SwitchCheckbox
			v-if="editing"
			v-model="hasElementList"
			class="mt-2"
			:title="`Add a ${sectionTemplate.subsectionElementSection}`"
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
	const updatedHasElementList = (numberOfElements: number) => {
		hasElementList.value = numberOfElements > 0;
	};
	onMounted(() => {
		updatedHasElementList(subsection.elements.length);
	});
	watch(
		() => subsection.elements.length,
		(numberOfElements: number) => {
			updatedHasElementList(numberOfElements);
		}
	);
</script>
