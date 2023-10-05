<template>
	<SubsectionCard
		:class="{
			['marked']: marked,
		}"
		:marked="marked"
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
			<icon-button
				title="Edit a Section"
				iconName="material-symbols:edit"
				@click.prevent="$emit('edit-section')"
			/>
			<icon-button
				title="Delete a Section"
				iconName="mdi:trash"
				@click.prevent="$emit('delete-section')"
			/>
		</template>
	</SubsectionCard>
</template>
<script lang="ts">
	import type { Section } from '../../../../models/Section';
	import SubsectionComponent from '../../Preview/PreviewSubsection.vue';
	import SubsectionCard from '../../../shared/Subsection/SubsectionCard.vue';
	import { scrollSmoothToElement } from '../../../../utils/scrollServices';
	import PreviewSectionHeader from '../../Preview/PreviewSectionHeader.vue';
	import type { PropType } from 'vue';
	import { useResumeStore } from '../../../../stores/ResumeStore';
	import { appStore } from '../../../../store';
	import IconButton from '../../../shared/Button/IconButton.vue';
	// TODO: Fix a bug after save section
	export default {
		name: 'EditorSection',
		components: {
			SubsectionComponent,
			SubsectionCard,
			PreviewSectionHeader,
			IconButton,
		},
		props: {
			section: {
				type: Object as PropType<Section>,
				require: true,
			},
			marked: {
				type: Boolean,
				require: true,
			},
		},
		setup() {
			const resumeStore = useResumeStore(appStore);
			return {
				resumeStore,
			};
		},
		mounted() {
			scrollSmoothToElement(this.$el);
		},
		data() {
			return {
				showSetting: false,
			};
		},
		computed: {
			isBeingEditingIntroduction() {
				return this.resumeStore.isBeingEditingIntroduction;
			},
		},
		methods: {
			changeSetting() {
				this.showSetting = !this.showSetting;
			},
		},
	};
</script>
