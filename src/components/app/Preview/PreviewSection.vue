<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
	<section class="m-2">
		<PreviewSectionHeader :name="section?.name" />
		<PreviewSubsection
			v-if="!allSubsectionsHaveOnlyATitle"
			v-for="(subsection, index) in section?.subsections"
			:key="index"
			:subsection="subsection"
		/>
		<ul class="ml-6 list-disc text-left" v-else>
			<li
				v-for="(subsection, index) in section?.subsections"
				:key="index"
				:subsection="subsection"
				v-show="subsection?.title"
			>
				<h3 class="mt-2 text-base font-semibold">
					{{ subsection?.title }}
				</h3>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
	import { computed, type PropType } from 'vue';
	import type { Section } from '../../../models/Section';
	import PreviewSubsection from '../Preview/PreviewSubsection.vue';
	import PreviewSectionHeader from './PreviewSectionHeader.vue';

	const props = defineProps({
		section: {
			type: Object as PropType<Section>,
			required: true,
		},
	});
	const allSubsectionsHaveOnlyATitle = computed(
		() =>
			props.section?.subsections.every(
				(subsection) =>
					!subsection.text &&
					!subsection.location &&
					subsection.elements.length == 0
			)
	);
</script>
