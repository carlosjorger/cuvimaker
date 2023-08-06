<template>
	<div
		class="dark:border-3 overflow-hidden rounded-lg border-4 border-primary bg-primary dark:border-zinc-300 dark:bg-dark-primary"
	>
		<EditorBar v-model="isEditingResume" />

		<div
			class="dark:border-t-3 max-h-[calc(100vh-16rem)] min-h-[calc(100vh-12.5rem)] overflow-scroll overflow-x-hidden border-t-4 border-primary bg-[#eee8ff] p-4 dark:border-zinc-300 dark:bg-[#130624] max-md:p-2"
		>
			<AppearFadePanelTransition>
				<div v-if="isEditingResume" class="relative">
					<EditorIntroduction
						:introduction="resume.introduction"
						:isBeingEditingIntroduction="
							resume.isBeingEditingIntroduction
						"
						@set-editing-introduction="setEditingIntroduction"
						@set-introduction="setIntroduction"
					/>
					<SubsectionAlign>
						<BasicButton
							class="add-section"
							:name="'Add a new Section'"
							@click="
								() => {
									showModal = true;
									editIndex = undefined;
								}
							"
						/>
					</SubsectionAlign>
					<async-create-section-modal
						v-show="showModal"
						:sections="resume.sections"
						:showModal="showModal"
						@close-modal="closeSectionModal"
						:editIndex="editIndex"
					/>
					<ConfirmationModal
						:entity-to-delete="'Section'"
						v-show="confirmationDeleteModal"
						@delete="deleteSection(sectionIndexToDelete)"
						@cancel="confirmationDeleteModal = false"
					/>
					<ListTransition class="z-0 block">
						<section-component
							v-for="(section, index) in resume.sections"
							:section="section"
							:key="section.name"
							@delete-section="confirmDeleteSection(index)"
							:isBeingEditingIntroduction="
								resume.isBeingEditingIntroduction
							"
							@edit-section="
								() => {
									showModal = true;
									editIndex = index;
								}
							"
						/>
					</ListTransition>
				</div>
			</AppearFadePanelTransition>
			<PreviewResume
				class="relative"
				:canShowPreviewResume="!isEditingResume"
				:resume="resume"
			/>
		</div>
	</div>
</template>
<script lang="ts">
	import SectionComponent from './app/Editor/Section/EditorSection.vue';
	import BasicButton from './shared/Button/BasicButton.vue';
	import { computed, defineAsyncComponent } from 'vue';
	import EditorIntroduction from './app/Editor/Introduction/EditorIntroduction.vue';
	import ListTransition from './shared/Transition/ListTransition.vue';
	import ConfirmationModal from './shared/Modal/ConfirmationModal.vue';
	import SubsectionAlign from './shared/Subsection/SubsectionAlign.vue';
	import EditorBar from './app/Editor/EditorBar.vue';
	import PreviewResume from './app/Preview/PreviewResume.vue';
	import type { Introduction } from '../models/Introduction';
	import AppearFadePanelTransition from './shared/Transition/AppearFadePanelTransition.vue';
	import { useLocalStorageStore } from '../stores/localStorageStore';
	import { appStore } from '../store';
	const AsyncCreateSectionModal = defineAsyncComponent(
		() => import('./app/Section/CreateSectionModal.vue')
	);
	export default {
		name: 'CVEditor',
		components: {
			SectionComponent,
			BasicButton,
			EditorIntroduction,
			ListTransition,
			ConfirmationModal,
			SubsectionAlign,
			AppearFadePanelTransition,
			EditorBar,
			PreviewResume,
			AsyncCreateSectionModal,
		},
		setup() {
			const localStorageStore = useLocalStorageStore(appStore);
			return { localStorageStore };
		},
		data() {
			return this.initialState();
		},
		provide() {
			return {
				sections: computed(() => this.resume.sections),
			};
		},
		methods: {
			initialState() {
				this.localStorageStore.loadResume();
				const resume = this.localStorageStore.resume;
				return {
					showModal: false,
					editIndex: undefined as number | undefined,
					resume: resume,
					confirmationDeleteModal: false,
					sectionIndexToDelete: -1,
					isEditingResume: true,
				};
			},
			confirmDeleteSection(index: number) {
				this.confirmationDeleteModal = true;
				this.sectionIndexToDelete = index;
			},
			deleteSection(index: number) {
				this.resume.sections.splice(index, 1);
				this.confirmationDeleteModal = false;
				this.saveResume();
			},
			setEditingIntroduction(value: boolean) {
				this.resume.isBeingEditingIntroduction = value;
			},
			setIntroduction(introduction: Introduction) {
				this.resume.introduction = introduction;
				this.saveResume();
			},
			closeSectionModal() {
				this.showModal = false;
				this.saveResume();
			},
			saveResume() {
				this.localStorageStore.saveResume(this.resume);
			},
		},
	};
</script>
<style>
	article {
		width: 40%;
	}
</style>
