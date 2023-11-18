<template>
	<div class="m-2 rounded-lg bg-base-100">
		<AppearFadeTransition>
			<ul
				v-if="loading"
				class="my-5 ml-20 max-h-[calc(100vh-16rem)] min-h-[calc(100vh-12.5rem)] overflow-auto overflow-x-hidden rounded-lg bg-base-100 pt-2 focus:text-neutral-focus max-md:mx-10 max-md:w-full max-sm:mx-0"
			>
				<li
					v-for="skeletonIndex in [1, 2, 3, 4, 5]"
					:key="skeletonIndex"
					class="skeleton my-3 ml-12 h-24 w-5/6 rounded-lg p-7 max-md:ml-8 max-md:w-11/12 max-sm:mx-auto max-sm:w-11/12"
				></li>
			</ul>
			<ul
				v-else
				class="my-5 ml-20 max-h-[calc(100vh-16rem)] min-h-[calc(100vh-12.5rem)] overflow-auto overflow-x-hidden rounded-lg bg-base-100 pt-2 focus:text-neutral-focus max-md:mx-10 max-md:w-full max-sm:mx-0"
			>
				<li v-for="path in paths" :key="path.params.id">
					<ResumeElement
						:indexResume="path.params.id"
						v-model="indexOfElementToDelete"
						:resume="getResumeName(path.params.id)"
					/>
				</li>
			</ul>
		</AppearFadeTransition>

		<ConfirmationModal
			id="delete_resume_modal"
			:entityToDelete="'resume'"
			@delete="clear()"
		/>
	</div>
</template>

<script setup lang="ts">
	import '@fontsource/black-ops-one';
	import { clearResume, getResume } from '../utils/localStorage';
	import { getResumePaths, type ResumePathsType } from '../utils/resumePaths';
	import ConfirmationModal from './shared/Modal/ConfirmationModal.vue';
	import { onMounted, ref } from 'vue';
	import AppearFadeTransition from './shared/Transition/AppearFadeTransition.vue';
	import ResumeElement from './ResumeElement.vue';
	let paths = ref([] as ResumePathsType[]);
	const indexOfElementToDelete = ref('');
	const loading = ref(true);
	onMounted(() => {
		loadPahts();
	});

	const clear = () => {
		clearResume(indexOfElementToDelete.value);
		loadPahts();
		indexOfElementToDelete.value = '';

		return false;
	};
	const getResumeName = (id: string) => {
		return getResume(id);
	};
	const loadPahts = () => {
		loading.value = true;
		paths.value = getResumePaths();
		loading.value = false;
	};
</script>
