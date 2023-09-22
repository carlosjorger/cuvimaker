<template>
	<EditorBar v-model="isEditingResume" />
	<div
		class="dark:border-t-3 max-h-[calc(100vh-16rem)] min-h-[calc(100vh-12.5rem)] overflow-scroll overflow-x-hidden border-t-4 border-primary bg-[#eee8ff] p-4 dark:border-zinc-300 dark:bg-[#130624] max-md:p-2"
	>
		<AppearFadePanelTransition>
			<EditorResume v-if="isEditingResume" v-model="resume" />
			<PreviewResume class="relative" v-else :resume="resume" />
		</AppearFadePanelTransition>
	</div>
</template>
<script lang="ts">
	import EditorBar from './app/Editor/EditorBar.vue';
	import PreviewResume from './app/Preview/PreviewResume.vue';
	import { useLocalStorageStore } from '../stores/localStorageStore';
	import { useResumeStore } from '../stores/ResumeStore';
	import { appStore } from '../store';
	import type { Resume } from '../models/Resume';
	import EditorResume from './app/Editor/EditorResume.vue';
	import AppearFadePanelTransition from './shared/Transition/AppearFadePanelTransition.vue';

	type CVEditorData = {
		resume: Resume;
		isEditingResume: boolean;
	};
	export default {
		name: 'CVEditor',
		components: {
			EditorBar,
			PreviewResume,
			EditorResume,
			AppearFadePanelTransition,
		},
		setup() {
			const resumeStore = useResumeStore(appStore);
			const localStorageStore = useLocalStorageStore(appStore);
			return { localStorageStore, resumeStore };
		},
		props: {
			Id: {
				type: String,
			},
		},

		data(): CVEditorData {
			return this.initialState();
		},
		methods: {
			initialState(): CVEditorData {
				if (this.Id) {
					this.localStorageStore.loadResume(this.Id);
				}
				const resumeFromLocalStorage = this.localStorageStore.resume;
				this.resumeStore.setResume(resumeFromLocalStorage);
				const { resume } = this.resumeStore;
				return {
					resume: resume,
					isEditingResume: true,
				};
			},
		},
	};
</script>
<style>
	article {
		width: 40%;
	}
</style>
../stores/ResumeStore
