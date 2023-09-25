<!-- TODO: use markedSection variable -->
<template>
	<div
		class="mt-2 flex justify-between rounded-3xl border-2 border-solid border-white bg-[var(--primary-form-color)] p-1.5 text-sm shadow-xl dark:bg-dark-primary"
		v-if="editing"
	>
		<textarea
			id="newElement"
			v-model="newElement"
			class="w-4/5 resize-none overflow-hidden bg-inherit p-2 text-white outline-none"
			placeholder="New element..."
			rows="1"
			@input="changeTextArea"
			@change="changeTextArea"
		></textarea>
		<AppearFadeTransition>
			<CloseAddButton
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
			:draggable="editing"
			@dragstart="startDrag($event, index)"
			@drop="onDrop($event, element, subsection.elements, index)"
			@dragenter="onDragEnter(index)"
			@dragover.prevent
			:key="element.id"
			@selectElement="
				selectedElement = selectedElement != index ? index : undefined
			"
			@delete-element="tryToDeleteElement"
			:index="index"
			v-bind="$attrs"
			:selecting="selectedElement == index"
			:element="element.name"
			:marked="markedSection == index"
		/>
	</ListTransition>
	<ConfirmationModal
		v-show="confirmationDeleteModal"
		:entityToDelete="'Element'"
		@cancel="confirmationDeleteModal = false"
		@delete="deleteElement"
	/>
</template>

<script setup lang="ts">
	import { inject, ref, watch } from 'vue';
	import { Subsection } from '../../../../models/Subsection';
	import CloseAddButton from '../../../shared/Button/CloseAddButton.vue';
	import SubsectionElement from './EditorElement.vue';
	import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
	import ListTransition from '../../../shared/Transition/ListTransition.vue';
	import ConfirmationModal from '../../../shared/Modal/ConfirmationModal.vue';
	import { useDrag } from '../../../../composables/useDrag';

	const newElement = ref('');
	const selectedElement = ref(undefined as number | undefined);
	const confirmationDeleteModal = ref(false);
	const indexOfElementToDelete = ref(-1);

	const subsection = inject('subsection', new Subsection());
	const editing = inject<boolean>('editing', false);
	const tryToDeleteElement = (index: number) => {
		confirmationDeleteModal.value = true;
		indexOfElementToDelete.value = index;
	};
	const deleteElement = () => {
		subsection.elements.splice(indexOfElementToDelete.value, 1);
		confirmationDeleteModal.value = false;
	};

	const changeTextArea = () => {
		var input = document.getElementById('newElement');
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
		var input = document.getElementById('newElement');
		if (input instanceof HTMLTextAreaElement) {
			input.style.height = '';
		}
	};
	const addElementIntoSubsection = (newElement: string) => {
		subsection.addElement(newElement);
	};
	const { onDragEnter, onDrop, startDrag, markedSection } = useDrag(
		() => ({})
	);
	watch(
		() => subsection,
		(newValue: Subsection) => {
			Object.assign(subsection.elements, newValue.elements);
		}
	);
</script>
