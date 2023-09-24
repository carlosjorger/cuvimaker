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
			:key="element.id"
			@selectElement="
				selectedElement = selectedElement != index ? index : undefined
			"
			@delete-element="tryToDeleteElement"
			:index="index"
			v-bind="$attrs"
			:selecting="selectedElement == index"
			:element="element.name"
		/>
	</ListTransition>
	<ConfirmationModal
		v-show="confirmationDeleteModal"
		:entityToDelete="'Element'"
		@cancel="confirmationDeleteModal = false"
		@delete="deleteElement"
	/>
</template>

<script lang="ts">
	import { Subsection } from '../../../../models/Subsection';
	import CloseAddButton from '../../../shared/Button/CloseAddButton.vue';
	import SubsectionElement from './EditorElement.vue';
	import { inject } from 'vue';
	import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
	import ListTransition from '../../../shared/Transition/ListTransition.vue';
	import ConfirmationModal from '../../../shared/Modal/ConfirmationModal.vue';
	export default {
		name: 'EditorElements',
		components: {
			CloseAddButton,
			SubsectionElement,
			AppearFadeTransition,
			ListTransition,
			ConfirmationModal,
		},

		data() {
			return {
				...this.initialState(),
				editing: inject('editing', false),
				subsection: inject('subsection', new Subsection()),
				confirmationDeleteModal: false,
				indexOfElementToDelete: -1,
			};
		},

		mounted() {
			this.changeTextArea();
		},
		methods: {
			initialState(): {
				newElement: string;
				selectedElement: number | undefined;
			} {
				return {
					newElement: '',
					selectedElement: undefined,
				};
			},
			hasAtLeastOneElement() {
				return (
					this.subsection.elements.length > 0 ||
					this.newElement.length > 0
				);
			},

			tryToDeleteElement(index: number) {
				this.confirmationDeleteModal = true;
				this.indexOfElementToDelete = index;
			},
			deleteElement() {
				this.subsection.elements.splice(this.indexOfElementToDelete, 1);
				this.confirmationDeleteModal = false;
			},
			initTextArea() {
				var input = document.getElementById('newElement');
				if (input instanceof HTMLTextAreaElement) {
					input.style.height = '';
				}
			},
			changeTextArea() {
				var input = document.getElementById('newElement');
				if (input) {
					input.style.height = '';
				}
				if (input instanceof HTMLTextAreaElement && input?.value) {
					input.style.height = `${input?.scrollHeight}px`;
				}
			},
			addElement() {
				this.addElementIntoSubsection(this.newElement);
				this.newElement = '';
				this.initTextArea();
			},
			addElementIntoSubsection(newElement: string) {
				this.subsection.addElement(newElement);
			},
		},
	};
</script>
