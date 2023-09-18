<template>
	<ul>
		<li v-for="resume in resumes" :key="resume.id" class="text-zinc-300">
			<a :href="`editor/${resume.id}`">{{ getResumeName(resume) }}</a>
		</li>
	</ul>
</template>

<script lang="ts">
	import type { Resume } from '../models/Resume';
	import { appStore } from '../store';
	import { useLocalStorageStore } from '../stores/localStorageStore';
	type ResumesListData = {
		resumes: Resume[];
	};
	export default {
		name: 'ResumesList',
		setup() {
			const localStorageStore = useLocalStorageStore(appStore);
			return { localStorageStore };
		},
		data(): ResumesListData {
			return this.initialState();
		},
		methods: {
			initialState(): ResumesListData {
				var resumes = this.localStorageStore.loadResumes;
				return {
					resumes,
				};
			},
			getResumeName(resume: Resume) {
				if (
					resume.introduction &&
					resume.introduction.name &&
					resume.introduction.profetion
				) {
					return `${resume.introduction.name} - ${resume.introduction.profetion}`;
				}
				if (resume.introduction && resume.introduction.name) {
					return `${resume.introduction.name} `;
				}
				return '';
			},
		},
	};
</script>

<style scoped></style>
