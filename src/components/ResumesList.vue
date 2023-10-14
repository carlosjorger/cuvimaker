<template>
	<div
		class="my-5 ml-20 focus:text-neutral-focus max-md:mx-10 max-sm:mx-auto max-sm:w-11/12"
	>
		<h2
			class="py-10 font-montserrat text-5xl font-extrabold max-sm:text-4xl"
		>
			Resumes
		</h2>
		<ul
			class="max-h-[calc(100vh-20rem)] min-h-[calc(100vh-15rem)] overflow-scroll overflow-x-hidden"
		>
			<li v-for="path in paths" :key="path.params.id">
				<a :href="`/editor/${path.params.id}`">
					<div
						class="card my-3 w-5/6 rounded-lg p-7 font-extrabold shadow-2xl shadow-base-300 transition-all duration-200 hover:translate-x-6 hover:bg-base-300 max-md:w-11/12 max-sm:w-full max-sm:hover:translate-x-2"
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
							<div>
								<div class="text-lg">
									{{
										getResumeName(path.params.id)
											?.introduction.name
									}}
								</div>
								<div>
									{{
										getResumeName(path.params.id)
											?.introduction.profetion
									}}
								</div>
							</div>
							<CircleButtonWithIcon
								icon="ic:baseline-delete"
								:width="2"
								text="Clear Resume"
								@click.prevent="
									tryToClearResume($event, path.params.id)
								"
							/>
						</div>
						<div v-else class="font-blackOpsOne text-2xl">
							EMPTY
						</div>
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
