<template>
	<ModalTemplate>
		<div
			class="m-0 flex w-2/5 flex-col rounded-lg border-4 border-primary bg-white p-4 dark:border-zinc-100 dark:bg-dark-primary-300 max-xl:w-1/2 max-lg:w-4/5 max-md:w-11/12 max-sm:w-11/12"
		>
			<header class="mb-2 flex items-center justify-between">
				<h3
					class="text-xl font-semibold text-primary dark:text-zinc-300"
				>
					{{ isEditing ? 'Edit Section' : 'Add a Section' }}
				</h3>
				<CloseAddButton
					v-on:click="$emit('close-modal')"
					:closeButton="true"
					:lineColor="'white'"
					:darklineColor="'zinc-300'"
					:buttonColor="'bg-[var(--primary-color)] dark:bg-dark-primary'"
				/>
			</header>
			<div class="mb-2 box-border">
				<input
					v-model="section.name"
					class="mt-2 w-full rounded-3xl border-2 border-solid p-2 font-semibold text-primary shadow-xl transition-all duration-300 placeholder:text-base focus:border-4 dark:bg-dark-primary-200 dark:text-zinc-300"
					:class="{
						'border-red-600 placeholder:text-red-600 dark:border-rose-500 dark:placeholder:text-rose-500 ':
							v$.section?.name.$errors.length > 0,
						'border-primary placeholder:text-primary dark:border-zinc-300  dark:placeholder:text-zinc-300':
							v$.section?.name.$errors.length <= 0,
					}"
					placeholder="Section Name"
					type="text"
				/>
				<ErrorsSection :errors="v$.section?.name.$errors" />
			</div>
			<div class="mb-2 box-border">
				<transition-group
					name="subsection"
					class="relative block h-96 overflow-scroll overflow-x-hidden p-5 max-md:p-3 max-sm:p-2"
					tag="div"
				>
					<editor-subsection
						ref="editorSubsection"
						v-for="(subsection, index) in section.subsections"
						:key="subsection.id"
						:draggable="!editing && !subsection.last"
						@dragstart="startDrag($event, index)"
						@drop="
							onDrop(
								$event,
								subsection,
								section.subsections,
								index,
								!editing && !subsection.last
							)
						"
						@dragenter="
							onDragEnter(index, !editing && !subsection.last)
						"
						:class="{
							['translate-x-2']: markedSection == index,
						}"
						@dragover.prevent
						:subsectionIndex="index"
						:prevSubsection="subsection"
						@show-confirmation-to-delete="
							selectedSectionIndex = index;
							confirmationDeleteModal = true;
						"
					/>
				</transition-group>
			</div>
			<BasicButton
				v-if="!isEditing"
				class="mx-auto w-full p-1"
				:name="'Add Section'"
				v-on:click="addSection(section)"
			/>
			<BasicButton
				v-if="isEditing"
				class="mx-auto w-full p-1"
				:name="'Edit Section'"
				v-on:click="updateSection"
			/>
			<ConfirmationModal
				v-show="confirmationDeleteModal"
				:entityToDelete="'Subsection'"
				@cancel="confirmationDeleteModal = false"
				@delete="removeSubsection"
			/>
		</div>
	</ModalTemplate>
</template>
<script setup lang="ts">
	import CloseAddButton from '../../shared/Button/CloseAddButton.vue';
	import EditorSubsection from '../Editor/Subsection/EditorSubsection.vue';
	import BasicButton from '../../shared/Button/BasicButton.vue';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers, required } from '@vuelidate/validators';
	import ErrorsSection from '../../shared/Error/ErrorsSection.vue';
	import ModalTemplate from '../../shared/others/ModalTemplate.vue';
	import ConfirmationModal from '../../shared/Modal/ConfirmationModal.vue';
	import { useResumeStore } from '../../../stores/ResumeStore';
	import { useSectionStore } from '../../../stores/SectionStore';

	import { appStore } from '../../../store';
	import type { Section } from '../../../models/Section';
	import emitter from '../../../utils/eventBus';
	import { reactive, computed, ref, watch, type Ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useDrag } from '../../../composables/useDrag';
	const props = defineProps({
		showModal: {
			type: Boolean,
			required: true,
		},
		editIndex: {
			type: Number,
		},
	});
	const resumeStore = useResumeStore(appStore);
	const sectionStore = useSectionStore(appStore);
	const editing = computed(() => sectionStore.editingIndex >= 0);
	const isEditing = computed(() => props.editIndex != undefined);
	const initialState = (): {
		section: Ref<Section>;
		confirmationDeleteModal: Ref<boolean>;
		selectedSectionIndex: Ref<number>;
	} => {
		if (props.editIndex != undefined && isEditing) {
			const tempSection = reactive(
				resumeStore.getSection(props.editIndex)
			);
			if (tempSection) {
				sectionStore.setSection(tempSection);
			}
		} else if (props.editIndex == undefined) {
			sectionStore.clear();
		}
		const { section } = storeToRefs(sectionStore);
		return {
			section: section,
			confirmationDeleteModal: ref(false),
			selectedSectionIndex: ref(0),
		};
	};
	let { section, confirmationDeleteModal, selectedSectionIndex } =
		initialState();
	const emit = defineEmits(['close-modal']);

	const anySectionWithThisName = () => {
		return resumeStore.anySectionWithThisName(
			props.editIndex,
			section.value.name
		);
	};
	const state = reactive({ section: section });
	const rules = {
		section: {
			name: {
				required,
				anySectionWithThisName: helpers.withMessage(
					'Cannot have a Section with the same name',
					anySectionWithThisName
				),
			},
		},
	};
	const v$ = useVuelidate(rules, state, { $scope: true });

	const resetWindow = () => {
		Object.assign(
			{ section, confirmationDeleteModal, selectedSectionIndex },
			initialState()
		);
	};
	const closeModal = () => {
		emit('close-modal');
	};
	const addSection = (section: Section) => {
		v$.value.$validate();
		if (v$.value.$error) {
			return;
		}
		resumeStore.addSection(section);
		closeModal();
		v$.value.$reset();
	};

	const updateSection = () => {
		if (sectionStore.subsectionEditing) {
			emitter?.emit('editing', sectionStore.editingIndex);
		} else if (isEditing.value) {
			v$.value.$validate();
			if (v$.value.section?.name.$error) {
				return;
			}
			if (props.editIndex != undefined) {
				resumeStore.setSection(props.editIndex, section.value);
			}
			v$.value.$reset();
			closeModal();
		}
	};
	const removeSubsection = () => {
		confirmationDeleteModal.value = false;
		sectionStore.removeSubsection(selectedSectionIndex.value);
	};
	const { onDragEnter, onDrop, startDrag, markedSection } = useDrag(
		'Subsection',
		() => ({})
	);
	watch(
		() => props.showModal,
		(newValue: boolean) => {
			if (newValue) {
				resetWindow();
			}
		}
	);
</script>
<style>
	.subsection-move {
		transition: opacity 0.5s ease;
		transition: transform 0.5s ease;
	}
	.subsection-leave-active {
		transition: all 0.5s ease;
	}
	.subsection-enter-active {
		transition: all 0.5s ease;
	}
	.subsection-enter-from,
	.subsection-leave-to {
		opacity: 0;
		transform: translateX(-1rem);
	}

	.subsection-leave-active {
		position: absolute;
	}
</style>
