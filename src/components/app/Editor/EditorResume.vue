<!-- TODO: Add a Resume Name form-->
<template>
	<AppearFadePanelTransition>
		<div v-if="isEditingResume" class="relative">
			<EditorIntroduction
				:introduction="resume.introduction"
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
				<editor-section
					v-for="(section, index) in resume.sections"
					:section="section"
					:key="section.name"
					@delete-section="confirmDeleteSection(index)"
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
</template>
<script lang="ts">
	import { defineAsyncComponent, type PropType } from 'vue';
	import BasicButton from '../../shared/Button/BasicButton.vue';
	import SubsectionAlign from '../../shared/Subsection/SubsectionAlign.vue';
	import AppearFadePanelTransition from '../../shared/Transition/AppearFadePanelTransition.vue';
	import EditorIntroduction from './Introduction/EditorIntroduction.vue';
	import ConfirmationModal from '../../shared/Modal/ConfirmationModal.vue';
	import ListTransition from '../../shared/Transition/ListTransition.vue';
	import EditorSection from './Section/EditorSection.vue';
	import type { Introduction } from '../../../models/Introduction';
	import { Resume } from '../../../models/Resume';
	import { useLocalStorageStore } from '../../../stores/localStorageStore';
	import { useResumeStore } from '../../../stores/ResumeStore';
	import { appStore } from '../../../store';

	const AsyncCreateSectionModal = defineAsyncComponent(
		() => import('../../app/Section/CreateSectionModal.vue')
	);
	type EditorResumeData = {
		showModal: boolean;
		editIndex: number | undefined;
		confirmationDeleteModal: boolean;
		sectionIndexToDelete: number;
	};
	export default {
		name: 'EditorResume',
		props: {
			isEditingResume: {
				type: Boolean,
				required: true,
			},
			modelValue: {
				type: Object as PropType<Resume>,
				required: true,
			},
		},
		components: {
			AppearFadePanelTransition,
			EditorIntroduction,
			SubsectionAlign,
			BasicButton,
			AsyncCreateSectionModal,
			ConfirmationModal,
			ListTransition,
			EditorSection,
		},
		setup() {
			const resumeStore = useResumeStore(appStore);
			const localStorageStore = useLocalStorageStore(appStore);
			return { localStorageStore, resumeStore };
		},
		data(): EditorResumeData {
			return this.initialState();
		},
		methods: {
			initialState(): EditorResumeData {
				return {
					showModal: false,
					editIndex: undefined as number | undefined,
					confirmationDeleteModal: false,
					sectionIndexToDelete: -1,
				};
			},
			confirmDeleteSection(index: number) {
				this.confirmationDeleteModal = true;
				this.sectionIndexToDelete = index;
			},
			deleteSection(index: number) {
				this.resumeStore.deleteSection(index);
				this.confirmationDeleteModal = false;
				this.saveResume();
			},
			setEditingIntroduction(value: boolean) {
				this.resumeStore.isBeingEditingIntroduction = value;
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
				this.$emit('update:modelValue', this.resume);
				this.localStorageStore.saveResume(this.resume);
			},
		},
		computed: {
			resume: {
				get() {
					return this.modelValue;
				},
				set(value: Resume) {
					this.$emit('update:modelValue', value);
				},
			},
		},
	};
</script>
