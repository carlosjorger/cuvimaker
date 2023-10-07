<template>
	<div class="m-5 mx-20 max-md:mx-10 max-sm:mx-auto max-sm:w-11/12">
		<h2
			class="py-5 font-montserrat text-5xl font-extrabold max-sm:text-4xl"
		>
			Resumes
		</h2>
		<ul>
			<li v-for="path in paths" :key="path.params.id">
				<a :href="`/editor/${path.params.id}`">
					<div
						class="my-3 w-2/3 rounded-lg bg-[#f5f0ff] p-7 font-extrabold transition-all duration-200 hover:translate-x-6 hover:bg-[#e1d7fd] dark:text-dark-primary max-md:w-5/6 max-sm:w-full max-sm:hover:translate-x-2"
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
								color="var(--primary-color)"
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
			v-show="confirmationDeleteModal"
			:entityToDelete="'resume'"
			@cancel="confirmationDeleteModal = false"
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

	let paths = ref([] as ResumePathsType[]);
	const confirmationDeleteModal = ref(false);
	const indexOfElementToDelete = ref('');
	onMounted(() => {
		paths.value = getResumePaths();
	});
	const getResumeName = (id: string) => {
		return getResume(id);
	};
	const tryToClearResume = (event: Event, index: string) => {
		event.stopPropagation();
		confirmationDeleteModal.value = true;
		indexOfElementToDelete.value = index;
		return false;
	};

	const clear = () => {
		clearResume(indexOfElementToDelete.value);
		paths = ref(getResumePaths());
		return false;
	};
</script>

<style scoped></style>
