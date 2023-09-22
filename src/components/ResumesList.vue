<!-- TODO: Add clear resume button -->
<!-- TODO: improve design -->
<template>
	<ul>
		<li v-for="path in paths" :key="path.params.id" class="text-zinc-300">
			<a :href="`/editor/${path.params.id}`">{{
				getResumeName(path.params.id)
			}}</a>
		</li>
	</ul>
</template>

<script lang="ts">
	import { appStore } from '../store';
	import { useLocalStorageStore } from '../stores/localStorageStore';
	import { getResumePaths, type ResumePathsType } from '../utils/resumePaths';
	type ResumesListData = {
		paths: ResumePathsType[];
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
				var paths = getResumePaths();
				return {
					paths: paths,
				};
			},
			getResumeName(id: string) {
				const resume = this.localStorageStore.getResume(id);
				if (!resume) {
					return '-----';
				}
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
				return '-----';
			},
		},
	};
</script>

<style scoped></style>
