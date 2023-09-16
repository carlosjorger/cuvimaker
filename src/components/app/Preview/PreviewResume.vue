<template>
	<AppearFadePanelTransition>
		<SubsectionAlign>
			<div
				v-if="canShowPreviewResume"
				class="rounded-md border-4 border-solid border-primary bg-[#f6f4fb] p-3 shadow-xl transition-colors duration-700 dark:border-zinc-300 dark:bg-dark-primary-300 max-lg:p-2 max-md:p-1"
			>
				<div id="resume">
					<PreviewIntroduction :introduction="resume.introduction" />
					<div
						class="mt-5 grid grid-cols-2 gap-3 p-1 text-base max-md:grid-cols-1"
					>
						<PreviewSection
							v-for="section in resume.sections"
							:section="section"
							:key="section.name"
						/>
					</div>
				</div>
				<BasicButton
					v-if="!isResumeEmpty()"
					class="w-28"
					name="Download"
					@click="save"
				/>
			</div>
		</SubsectionAlign>
	</AppearFadePanelTransition>
</template>

<script lang="ts">
	import { Resume } from '../../../models/Resume';
	import BasicButton from '../../shared/Button/BasicButton.vue';
	import AppearFadePanelTransition from '../../shared/Transition/AppearFadePanelTransition.vue';
	import PreviewIntroduction from './PreviewIntroduction.vue';
	import PreviewSection from './PreviewSection.vue';
	import {
		savePDF,
		createResumePDFDefinition,
	} from '../../../utils/resumePDF';
	import { Introduction } from '../../../models/Introduction';
	import type { PropType } from 'vue';
	import SubsectionAlign from '../../shared/Subsection/SubsectionAlign.vue';

	export default {
		components: {
			AppearFadePanelTransition,
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
			canShowPreviewResume: {
				type: Boolean,
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
