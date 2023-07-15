<template>
	<AppearFadePanelTransition>
		<div v-show="canShowPreviewResume" class="p-5 max-lg:p-3 max-md:p-2">
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
			<BasicButton class="w-28" name="Save" @click="save" />
		</div>
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
	export default {
		components: {
			AppearFadePanelTransition,
			PreviewIntroduction,
			PreviewSection,
			BasicButton,
		},
		props: {
			resume: {
				type: Resume,
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
				savePDF(resumeDefinition);
			},
		},
	};
</script>
