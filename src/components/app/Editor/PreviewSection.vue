<template>
	<section class="m-2">
		<header>
			<h3 class="text-xl font-extrabold text-primary dark:text-white">
				{{ section?.name }}
			</h3>
		</header>
		<hr class="mt-1 h-1 rounded-md bg-primary dark:bg-zinc-300" />
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
	import SubsectionComponent from '../SectionView/Subsection/SubsectionComponent.vue';
	export default {
		props: {
			section: {
				type: Object as PropType<Section>,
				required: true,
			},
		},
		components: {
			SubsectionComponent,
		},
	};
</script>
