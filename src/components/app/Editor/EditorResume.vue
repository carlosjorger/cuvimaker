<template>
	<div class="relative">
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
				:id="section.name"
				:section="section"
				:key="section.name"
				:draggable="true"
				@dragstart="startDrag($event, index)"
				@drop="onDrop($event, section, index)"
				@dragenter="onDragEnter(index)"
				:marked="markedSection == index"
				@dragover.prevent
				@delete-section="confirmDeleteSection(index)"
				class="cursor-move"
				@edit-section="
					() => {
						showModal = true;
						editIndex = index;
					}
				"
			/>
		</ListTransition>
	</div>
</template>
<script setup lang="ts">
	import { computed, defineAsyncComponent, ref, type PropType } from 'vue';
	import BasicButton from '../../shared/Button/BasicButton.vue';
	import SubsectionAlign from '../../shared/Subsection/SubsectionAlign.vue';
	import EditorIntroduction from './Introduction/EditorIntroduction.vue';
	import ConfirmationModal from '../../shared/Modal/ConfirmationModal.vue';
	import ListTransition from '../../shared/Transition/ListTransition.vue';
	import EditorSection from './Section/EditorSection.vue';
	import type { Introduction } from '../../../models/Introduction';
	import { Resume } from '../../../models/Resume';
	import { useLocalStorageStore } from '../../../stores/localStorageStore';
	import { useResumeStore } from '../../../stores/ResumeStore';
	import { appStore } from '../../../store';
	import { useDrag } from '../../../composables/useDrag';
	const AsyncCreateSectionModal = defineAsyncComponent(
		() => import('../../app/Section/CreateSectionModal.vue')
	);
	const props = defineProps({
		modelValue: {
			type: Object as PropType<Resume>,
			required: true,
		},
	});
	const showModal = ref(false);
	const editIndex = ref(undefined as number | undefined);
	const confirmationDeleteModal = ref(false);
	const sectionIndexToDelete = ref(-1);

	const resumeStore = useResumeStore(appStore);
	const localStorageStore = useLocalStorageStore(appStore);

	const emit = defineEmits(['update:modelValue']);
	const resume = computed({
		get() {
			return props.modelValue;
		},
		set(value: Resume) {
			emit('update:modelValue', value);
		},
	});
	const confirmDeleteSection = (index: number) => {
		confirmationDeleteModal.value = true;
		sectionIndexToDelete.value = index;
	};
	const deleteSection = (index: number) => {
		resumeStore.deleteSection(index);
		confirmationDeleteModal.value = false;
		saveResume();
	};
	const setEditingIntroduction = (value: boolean) => {
		resumeStore.isBeingEditingIntroduction = value;
	};
	const setIntroduction = (introduction: Introduction) => {
		resume.value.introduction = introduction;
		saveResume();
	};
	const closeSectionModal = () => {
		showModal.value = false;
		saveResume();
	};
	const saveResume = () => {
		emit('update:modelValue', resume.value);
		localStorageStore.saveResume(resume.value);
	};
	const { onDragEnter, onDrop, startDrag, markedSection } = useDrag(
		resume.value.sections,
		saveResume
	);
</script>
