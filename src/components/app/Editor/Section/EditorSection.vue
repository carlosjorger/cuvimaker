<template>
	<SubsectionCard
		:disableEditSetting="isBeingEditingIntroduction"
		:ifEditing="false"
	>
		<template #body>
			<div @click="changeSetting">
				<PreviewSectionHeader :name="section?.name" />
				<SubsectionComponent
					v-for="(subsection, index) in section?.subsections"
					:key="index"
					:subsection="subsection"
				/>
			</div>
		</template>
		<template #footer>
			<button
				class="w-12 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
				title="Delete a Section"
			>
				<Icon
					@click="$emit('delete-section')"
					icon="mdi:trash"
					width="30"
				/>
			</button>
			<button
				class="w-12 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
				title="Edit a Section"
			>
				<Icon
					icon="material-symbols:edit"
					width="30"
					@click="$emit('edit-section')"
				/>
			</button>
		</template>
	</SubsectionCard>
</template>
<script lang="ts">
	import type { Section } from '../../../../models/Section';
	import SubsectionComponent from '../../Preview/PreviewSubsection.vue';
	import { Icon } from '@iconify/vue';
	import SubsectionCard from '../../../shared/Subsection/SubsectionCard.vue';
	import { scrollSmoothToElement } from '../../../../utils/scrollServices';
	import PreviewSectionHeader from '../../Preview/PreviewSectionHeader.vue';
	import type { PropType } from 'vue';
	export default {
		name: 'EditorSection',
		components: {
			SubsectionComponent,
			Icon,
			SubsectionCard,
			PreviewSectionHeader,
		},
		props: {
			section: {
				type: Object as PropType<Section>,
				require: true,
			},
			isBeingEditingIntroduction: Boolean,
		},
		mounted() {
			scrollSmoothToElement(this.$el);
		},
		data() {
			return {
				showSetting: false,
			};
		},
		methods: {
			changeSetting() {
				this.showSetting = !this.showSetting;
			},
		},
	};
</script>
