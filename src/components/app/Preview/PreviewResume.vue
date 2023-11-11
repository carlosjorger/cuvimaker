<template>
	<SubsectionAlign>
		<div
			class="rounded-md border-primary bg-base-300 p-3 shadow-xl transition-colors duration-700 max-lg:p-2 max-md:p-1"
		>
			<PreviewIntroduction :introduction="resume.introduction" />
			<div
				class="mt-5 grid min-w-0 grid-cols-2 gap-2 overflow-hidden p-1 text-base max-md:grid-cols-1"
			>
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

<script setup lang="ts">
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

	const props = defineProps({
		resume: {
			type: Object as PropType<Resume>,
			required: true,
		},
		previewResumeTransition: {
			type: Number,
			default: 0.5,
		},
	});
	const save = async () => {
		var resumeDefinition = createResumePDFDefinition(props.resume);
		await savePDF(resumeDefinition);
	};
	const isResumeEmpty = () => {
		return (
			props.resume.sections.length == 0 &&
			JSON.stringify(props.resume.introduction) ===
				JSON.stringify(new Introduction())
		);
	};
</script>
