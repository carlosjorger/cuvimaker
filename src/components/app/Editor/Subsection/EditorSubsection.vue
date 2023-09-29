<template>
	<div ref="el">
		<ShakeTemplate
			:shake="shake"
			v-scroll-if="subsection"
			class="max-ms:p-2 mt-3 w-full rounded-lg bg-primary p-4 text-white shadow-2xl shadow-zinc-200 transition-all duration-500 dark:bg-dark-primary-200 dark:shadow-lg dark:shadow-zinc-500 max-md:p-3"
		>
			<div>
				<div class="flex items-center justify-between">
					<AppearFadeTransition>
						<CloseAddButton
							:toolTipText="
								subsection.last
									? 'Add Subsection'
									: 'Delete Subsection'
							"
							v-on:click="addRemoveSubSection()"
							:closeButton="!subsection.last"
							v-if="!editing"
						/>
					</AppearFadeTransition>
					<AppearFadeTransition>
						<CircleButtonWithIcon
							v-if="!subsection.last && !editing"
							@click="editSubSection"
							text="Edit Subsection"
							color="var(--primary-color)"
							icon="ic:baseline-mode-edit"
						/>
					</AppearFadeTransition>
				</div>
				<form
					v-on:submit.prevent
					v-if="!subsection.last"
					class="max-ms:p-1 p-5 max-md:p-1"
				>
					<SubsectionForm
						class="text-lg"
						v-model="state.subsection.title"
						:placeholder="'Subsection title'"
						:errors="v$.subsection.title.$errors"
					/>
					<SubsectionForm
						v-model="subsection.text"
						:placeholder="'Subsection subtitle'"
					/>
					<EditorTimeIntervalSection
						v-model="subsection.subsectionTimeInterval"
					/>
					<EditorListSection />
					<div class="flex justify-between">
						<ModalButton
							v-if="editing"
							:name="'Save'"
							v-on:click="saveSubSection"
						/>
						<ModalButton
							v-if="editing && !prevSubsection.isEmpty"
							:name="'Cancel'"
							v-on:click="cancelSubSection"
						/>
					</div>
				</form>
			</div>
		</ShakeTemplate>
	</div>
</template>
<script setup lang="ts">
	import CloseAddButton from '../../../shared/Button/CloseAddButton.vue';
	import { Subsection } from '../../../../models/Subsection';
	import SubsectionForm from '../../../shared/TextArea/BasicTextArea.vue';
	import { scrollSmoothToElement } from '../../../../utils/scrollServices';
	import { useVuelidate } from '@vuelidate/core';
	import { required } from '@vuelidate/validators';
	import EditorTimeIntervalSection from '../TimeInterval/EditorTimeIntervalSection.vue';
	import ModalButton from '../../../shared/Button/ModalButton.vue';
	import EditorListSection from '../List/EditorListSection.vue';
	import {
		type PropType,
		ref,
		reactive,
		type Ref,
		onMounted,
		watch,
		provide,
	} from 'vue';
	import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
	import CircleButtonWithIcon from '../../../shared/Button/CircleButtonWithIcon.vue';
	import ShakeTemplate from '../../../shared/others/ShakeTemplate.vue';
	import {
		copySubsection,
		isEmptySubsection,
	} from '../../../../extensions/extensions';
	import { useSectionStore } from '../../../../stores/SectionStore';
	import { appStore } from '../../../../store';
	import emitter from '../../../../utils/eventBus';
	const props = defineProps({
		prevSubsection: {
			type: Object as PropType<Subsection>,
			required: true,
		},
		subsectionIndex: {
			type: Number,
			required: true,
		},
	});
	const sectionStore = useSectionStore(appStore);

	const el = ref<HTMLElement | null>(null);
	const emit = defineEmits(['show-confirmation-to-delete']);

	const initialState = (): {
		subsection: Subsection;
		editing: Ref<boolean>;
		shake: Ref<boolean>;
	} => {
		return {
			subsection: reactive(
				isEmptySubsection(props.prevSubsection)
					? new Subsection()
					: copySubsection(props.prevSubsection)
			),
			editing: ref(false),
			shake: ref(false),
		};
	};
	const shakeSubsection = () => {
		shake.value = true;
		setTimeout(() => {
			shake.value = false;
		}, 1500);
	};
	const tryingGoToThisSubsection = (index: number) => {
		if (index == props.subsectionIndex) {
			scrollSmoothToElement(el.value as Element);
			shakeSubsection();
		}
	};
	let { subsection, editing, shake } = initialState();
	const rules = {
		subsection: {
			title: {
				required,
			},
		},
	};
	const state = reactive({ subsection: subsection });
	const v$ = useVuelidate(rules, state, { $scope: true });
	onMounted(() => {
		emitter.on('editing', (index) => {
			tryingGoToThisSubsection(index as number);
		});
	});
	const resetWindow = () => {
		v$.value.$reset();
		Object.assign({ subsection, editing, shake }, initialState());
	};
	const vScrollIf = {
		mounted: (el: Element, { value }: { value: Subsection }): void => {
			if (value.last) {
				scrollSmoothToElement(el);
			}
		},
	};
	provide('subsection', subsection);
	provide('editing', editing);
	const emmitSendEditing = () => {
		emitter?.emit('editing', sectionStore.editingIndex);
	};
	const addSubSection = () => {
		if (sectionStore.subsectionEditing) {
			emmitSendEditing();
		} else {
			sectionStore.addNewSubsection();
		}
	};
	const addRemoveSubSection = () => {
		if (subsection.last) {
			resetWindow();
			addSubSection();
		} else if (sectionStore.subsectionEditing) {
			emmitSendEditing();
		} else {
			emit('show-confirmation-to-delete');
		}
	};
	const validate = () => {
		v$.value.$validate();
	};
	const saveSubSection = () => {
		validate();
		if (v$.value.$error) {
			return;
		}
		v$.value.$reset();
		sectionStore.removeSubsection;
		sectionStore.setSubsection(
			props.subsectionIndex,
			copySubsection(subsection)
		);
		sectionStore.disabledEditing();
	};
	const cancelSubSection = () => {
		subsection = copySubsection(props.prevSubsection);
		sectionStore.disabledEditing();
	};

	const setEditingIndexToThisSubsection = () => {
		sectionStore.setEditingIndex(props.subsectionIndex);
	};
	const editSubSection = () => {
		if (sectionStore.subsectionEditing) {
			emmitSendEditing();
		} else {
			setEditingIndexToThisSubsection();
		}
	};
	watch(
		() => sectionStore.editingIndex,
		(newValue: number) => {
			editing.value = newValue == props.subsectionIndex;
		}
	);
	watch(
		() => props.prevSubsection,
		(newValue: Subsection) => {
			Object.assign(subsection, copySubsection(newValue));
		},
		{ deep: true }
	);
</script>
