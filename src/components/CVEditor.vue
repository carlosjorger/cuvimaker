<template>
	<div class="grid">
		<EditorBar v-model="isEditingResume" />
		<div
			class="max-h-[calc(100vh-16rem)] min-h-[calc(100vh-12.5rem)] overflow-auto overflow-x-hidden rounded-sm border-0 bg-base-100 bg-top p-4 max-md:p-2"
		>
			<AppearFadePanelTransition>
				<EditorResume v-if="isEditingResume" v-model="resume" />
				<PreviewResume class="relative" v-else :resume="resume" />
			</AppearFadePanelTransition>
		</div>
	</div>
</template>
<script setup lang="ts">
	import EditorBar from './app/Editor/EditorBar.vue';
	import PreviewResume from './app/Preview/PreviewResume.vue';
	import { loadResume } from '../utils/localStorage';
	import { useResumeStore } from '../stores/ResumeStore';
	import { appStore } from '../store';
	import { Resume } from '../models/Resume';
	import EditorResume from './app/Editor/EditorResume.vue';
	import AppearFadePanelTransition from './shared/Transition/AppearFadePanelTransition.vue';
	import { onMounted, ref } from 'vue';

	const resumeStore = useResumeStore(appStore);
	const props = defineProps({
		Id: {
			type: String,
			required: true,
		},
	});
	const isEditingResume = ref(true);
	let resume = ref(new Resume(props.Id));
	onMounted(() => {
		const resumeFromLocalStorage = loadResume(props.Id);
		resumeStore.setResume(resumeFromLocalStorage);
		resume.value = resumeStore.resume;
	});
</script>
