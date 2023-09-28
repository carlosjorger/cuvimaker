<!-- TODO: Add clear resume button -->
<!-- TODO: Make responsible -->
<!-- TODO: improve the resume design list -->
<template>
	<div class="m-4">
		<h2
			class="mx-20 my-3 font-montserrat text-4xl font-extrabold text-zinc-50"
		>
			Resumes
		</h2>
		<ul>
			<li v-for="path in paths" :key="path.params.id">
				<a :href="`/editor/${path.params.id}`">
					<div
						v-if="
							getResumeName(path.params.id)?.introduction.name &&
							getResumeName(path.params.id)?.introduction
								.profetion
						"
						class="mx-20 my-3 w-2/3 rounded-lg bg-[#f5f0ff] p-7 font-extrabold transition-all dark:text-dark-primary max-md:w-5/6 max-sm:w-11/12"
					>
						<div class="text-lg">
							{{
								getResumeName(path.params.id)?.introduction.name
							}}
						</div>
						<div>
							{{
								getResumeName(path.params.id)?.introduction
									.profetion
							}}
						</div>
					</div>
					<div
						v-else
						class="mx-20 my-3 w-2/3 rounded-lg bg-[#f5f0ff] p-7 font-blackOpsOne font-extrabold transition-all dark:text-dark-primary max-md:w-5/6 max-sm:w-11/12"
					>
						<div class="text-2xl">EMPTY</div>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import '@fontsource/black-ops-one';

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
				return resume;
			},
		},
	};
</script>

<style scoped></style>
