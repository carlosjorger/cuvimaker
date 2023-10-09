<template>
	<div class="relative">
		<EditorIntroduction
			:introduction="resume.introduction"
			@set-editing-introduction="setEditingIntroduction"
			@set-introduction="setIntroduction"
		/>
		<SubsectionAlign>
			<BasicButton
				aria-label="Add a new Section"
				class="add-section"
				name="Add a new Section"
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
			id="delete_section_modal"
			:entity-to-delete="'Section'"
			@delete="deleteSection(sectionIndexToDelete)"
		/>

		<ListTransition class="z-0 block">
			<editor-section
				v-for="(section, index) in resume.sections"
				:id="section.name"
				:section="section"
				:key="section.name"
				:draggable="true"
				@dragstart="startDrag($event, index)"
				@drop="onDrop($event, section, resume.sections, index, true)"
				@dragenter="onDragEnter(index, true)"
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
	import { saveResumeInLocalStorage } from '../../../utils/localStorage';
	import { useResumeStore } from '../../../stores/ResumeStore';
	import { appStore } from '../../../store';
	import { useDrag } from '../../../composables/useDrag';
	import { useOpenModal } from '../../../composables/useOpenModal';

	const { onShowModal } = useOpenModal('delete_section_modal');
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
	const sectionIndexToDelete = ref(-1);

	const resumeStore = useResumeStore(appStore);

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
		onShowModal();
		sectionIndexToDelete.value = index;
	};
	const deleteSection = (index: number) => {
		resumeStore.deleteSection(index);
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
		saveResumeInLocalStorage(resume.value);
	};
	const { onDragEnter, onDrop, startDrag, markedSection } = useDrag(
		'Section',
		saveResume
	);
</script>
