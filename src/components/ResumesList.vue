<template>
	<div class="rounded-lg bg-base-100">
		<ul
			class="my-5 ml-20 max-h-[calc(100vh-16rem)] min-h-[calc(100vh-12.5rem)] overflow-auto overflow-x-hidden rounded-lg bg-base-100 pt-2 focus:text-neutral-focus max-md:mx-10 max-sm:mx-auto max-sm:w-11/12"
		>
			<li v-for="path in paths" :key="path.params.id">
				<a :href="`/editor/${path.params.id}`">
					<div
						class="card my-3 ml-12 w-5/6 rounded-lg bg-base-200 p-7 font-extrabold shadow-2xl shadow-warning-content transition-all duration-200 hover:translate-x-6 hover:bg-base-300 dark:shadow-success-content max-md:w-11/12 max-sm:w-full max-sm:hover:translate-x-2"
					>
						<div
							class="flex items-center justify-between"
							v-if="
								getResumeName(path.params.id)?.introduction
									.name &&
								getResumeName(path.params.id)?.introduction
									.profetion
							"
						>
							<hgroup>
								<h3 class="text-lg">
									{{
										getResumeName(path.params.id)
											?.introduction.name
									}}
								</h3>
								<h4>
									{{
										getResumeName(path.params.id)
											?.introduction.profetion
									}}
								</h4>
							</hgroup>
							<CircleButtonWithIcon
								icon="ic:baseline-delete"
								text="Clear Resume"
								@click.prevent="
									tryToClearResume($event, path.params.id)
								"
							/>
						</div>
						<h3 v-else class="font-blackOpsOne text-2xl">EMPTY</h3>
					</div>
				</a>
			</li>
		</ul>
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
	import CircleButtonWithIcon from './shared/Button/CircleButtonWithIcon.vue';
	import ConfirmationModal from './shared/Modal/ConfirmationModal.vue';
	import { onMounted, ref } from 'vue';
	import { useOpenModal } from './../composables/useOpenModal';

	const { onShowModal } = useOpenModal('delete_resume_modal');
	let paths = ref([] as ResumePathsType[]);
	const indexOfElementToDelete = ref('');
	onMounted(() => {
		paths.value = getResumePaths();
	});
	const getResumeName = (id: string) => {
		return getResume(id);
	};
	const tryToClearResume = (event: Event, index: string) => {
		event.stopPropagation();
		indexOfElementToDelete.value = index;
		onShowModal();
		return false;
	};

	const clear = () => {
		clearResume(indexOfElementToDelete.value);
		paths.value = getResumePaths();
		return false;
	};
</script>

<style scoped></style>
