<template>
	<section class="m-2">
		<PreviewSectionHeader :name="section?.name" />
		<SubsectionComponent
			v-for="(subsection, index) in section?.subsections"
			:key="index"
			:subsection="subsection"
		/>
	</section>
</template>

<script lang="ts">
	import type { PropType } from 'vue';
	import type { Section } from '../../../models/Section';
	import SubsectionComponent from '../Preview/PreviewSubsection.vue';
	import PreviewSectionHeader from './PreviewSectionHeader.vue';
	export default {
		props: {
			section: {
				type: Object as PropType<Section>,
				required: true,
			},
		},
		components: {
			SubsectionComponent,
			PreviewSectionHeader,
		},
	};
</script>
