<template>
	<AppearFadePanelTransition>
		<div v-show="canShowPreviewResume" class="p-5 max-lg:p-3 max-md:p-2">
			<PreviewIntroduction :introduction="resume.introduction" />
		</div>
	</AppearFadePanelTransition>
</template>

<script lang="ts">
	import { Resume } from '../../../models/Resume';
	import AppearFadePanelTransition from '../../shared/Transition/AppearFadePanelTransition.vue';
	import PreviewIntroduction from './PreviewIntroduction.vue';

	export default {
		components: { AppearFadePanelTransition, PreviewIntroduction },
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
	};
</script>
