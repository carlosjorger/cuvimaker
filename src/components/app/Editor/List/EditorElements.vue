<template>
	<div
		class="mt-2 flex justify-between rounded-3xl border-2 border-solid border-base-content p-1.5 text-sm shadow-xl"
		v-if="editing"
	>
		<textarea
			ref="newElementHTML"
			v-model="newElement"
			class="w-4/5 resize-none overflow-hidden bg-inherit p-4 text-base-content caret-base-content outline-none"
			:placeholder="`New ${sectionTemplate.subsectionElement}...`"
			rows="1"
			@input="changeTextArea"
			@change="changeTextArea"
		></textarea>
		<AppearFadeTransition>
			<CloseAddButton
				:toolTipText="`Add ${sectionTemplate.subsectionElement}`"
				v-if="newElement.trim()"
				:size="2.3"
				v-on:click="addElement()"
				:buttonColor="'bg-inherit'"
				:lineColor="'white'"
				:darklineColor="'zinc-300'"
			/>
		</AppearFadeTransition>
	</div>
	<ListTransition class="relative block">
		<SubsectionElement
			v-for="(element, index) in subsection.elements"
			:key="element.id"
			:draggable="editing && selectedElement != index"
			:class="{
				['cursor-move']: editing && selectedElement != index,
			}"
			@dragstart="startDrag($event, index)"
			@drop="onDrop($event, element, subsection.elements, index, editing)"
			@dragenter="onDragEnter(index, editing)"
			@dragover.prevent
			@selectElement="
				selectedElement = selectedElement != index ? index : undefined
			"
			:section-template="sectionTemplate"
			@delete-element="tryToDeleteElement"
			:index="index"
			v-bind="$attrs"
			:selecting="selectedElement == index"
			:element="element.name"
			:marked="markedSection == index"
		/>
	</ListTransition>
	<ConfirmationModal
		id="delete_element_modal"
		:entityToDelete="'Element'"
		@delete="deleteElement"
	/>
</template>

<script setup lang="ts">
	import { inject, ref, watch, type PropType } from 'vue';
	import { Subsection } from '../../../../models/Subsection';
	import CloseAddButton from '../../../shared/Button/CloseAddButton.vue';
	import SubsectionElement from './EditorElement.vue';
	import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
	import ListTransition from '../../../shared/Transition/ListTransition.vue';
	import ConfirmationModal from '../../../shared/Modal/ConfirmationModal.vue';
	import { useDrag } from '../../../../composables/useDrag';
	import { useOpenModal } from '../../../../composables/useOpenModal';
	import type { SectionTemplate } from '../../../../models/SectionTemplate';

	defineProps({
		sectionTemplate: {
			type: Object as PropType<SectionTemplate>,
			required: true,
		},
	});
	const newElement = ref('');
	const selectedElement = ref(undefined as number | undefined);
	const newElementHTML = ref<HTMLElement | null>(null);

	const indexOfElementToDelete = ref(-1);
	const { onShowModal } = useOpenModal('delete_element_modal');
	const subsection = inject('subsection', new Subsection());
	const editing = inject<boolean>('editing', false);
	const tryToDeleteElement = (index: number) => {
		onShowModal();
		indexOfElementToDelete.value = index;
	};
	const deleteElement = () => {
		subsection.elements.splice(indexOfElementToDelete.value, 1);
	};

	const changeTextArea = () => {
		var input = newElementHTML.value;
		if (input) {
			input.style.height = '';
		}
		if (input instanceof HTMLTextAreaElement && input?.value) {
			input.style.height = `${input?.scrollHeight}px`;
		}
	};
	const addElement = () => {
		addElementIntoSubsection(newElement.value);
		newElement.value = '';
		initTextArea();
	};
	const initTextArea = () => {
		var input = newElementHTML.value;
		if (input instanceof HTMLTextAreaElement) {
			input.style.height = '';
		}
	};
	const addElementIntoSubsection = (newElement: string) => {
		subsection.addElement(newElement);
	};
	const { onDragEnter, onDrop, startDrag, markedSection } = useDrag(
		'Element',
		() => ({})
	);
	watch(
		() => subsection,
		(newValue: Subsection) => {
			Object.assign(subsection.elements, newValue.elements);
		}
	);
</script>
