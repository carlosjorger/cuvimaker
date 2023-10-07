<template>
	<SubsectionAlign>
		<div
			class="rounded-md border-primary bg-base-200 p-3 shadow-xl transition-colors duration-700 max-lg:p-2 max-md:p-1"
		>
			<div id="resume">
				<PreviewIntroduction :introduction="resume.introduction" />
				<div
					class="mt-5 grid min-w-0 grid-cols-2 gap-2 overflow-hidden p-1 text-base max-md:grid-cols-1"
				>
					<!-- TODO: taking all the space -->
					<PreviewSection
						v-for="section in resume.sections"
						:section="section"
						:key="section.name"
						:class="{
							[`row-span-2`]: section.subsections.length == 2,
							[`row-span-3`]: section.subsections.length == 3,
							[`row-span-4`]: section.subsections.length > 3,
						}"
					/>
				</div>
			</div>
			<BasicButton
				v-if="!isResumeEmpty()"
				class="w-28"
				name="Download"
				@click="save"
				aria-label="Download Resume"
			/>
		</div>
	</SubsectionAlign>
</template>

<script lang="ts">
	import { Resume } from '../../../models/Resume';
	import BasicButton from '../../shared/Button/BasicButton.vue';
	import PreviewIntroduction from './PreviewIntroduction.vue';
	import PreviewSection from './PreviewSection.vue';
	import {
		savePDF,
		createResumePDFDefinition,
	} from '../../../utils/pdf/resumePDF';
	import { Introduction } from '../../../models/Introduction';
	import type { PropType } from 'vue';
	import SubsectionAlign from '../../shared/Subsection/SubsectionAlign.vue';

	export default {
		components: {
			PreviewIntroduction,
			PreviewSection,
			BasicButton,
			SubsectionAlign,
		},
		props: {
			resume: {
				type: Object as PropType<Resume>,
				required: true,
			},
			previewResumeTransition: {
				type: Number,
				default: 0.5,
			},
		},
		methods: {
			async save() {
				var resumeDefinition = createResumePDFDefinition(this.resume);
				await savePDF(resumeDefinition);
			},
			isResumeEmpty() {
				return (
					this.resume.sections.length == 0 &&
					JSON.stringify(this.resume.introduction) ===
						JSON.stringify(new Introduction())
				);
			},
		},
	};
</script>
