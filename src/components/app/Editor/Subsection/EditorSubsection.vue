<template>
	<div ref="el">
		<ShakeTemplate
			:shake="shake"
			v-scroll-if="subsection"
			:class="{
				'bg-base-300': editing,
				'hover:-translate-y-2 ': !editing,
			}"
			class="z-20 mt-3 w-full rounded-lg bg-base-200 p-3 shadow-2xl shadow-zinc-200 transition-all duration-500 hover:bg-base-300 dark:shadow-lg dark:shadow-zinc-500 max-md:p-3 max-sm:p-2"
		>
			<div class="flex items-center justify-between">
				<AppearFadeTransition>
					<CloseAddButton
						:toolTipText="
							subsection.last
								? `Add ${sectionTemplate.subsectionName}`
								: `Delete ${sectionTemplate.subsectionName}`
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
						:text="`Edit ${sectionTemplate.subsectionName}`"
						icon="ic:baseline-mode-edit"
					/>
				</AppearFadeTransition>
			</div>
			<form
				v-on:submit.prevent
				v-if="!subsection.last"
				class="p-5 max-md:p-3 max-sm:p-2"
			>
				<SubsectionForm
					class="mt-1 text-lg"
					v-model="state.subsection.title"
					:placeholder="sectionTemplate.subsectionTitleName"
					:errors="v$.subsection.title.$errors"
				/>
				<SubsectionForm
					v-if="sectionTemplate.isEnableSubtitle"
					class="mt-2"
					v-model="subsection.text"
					:placeholder="sectionTemplate.subtitleName"
				/>

				<EditorSiteSection
					v-model="subsection.subsectionTimeInterval"
					v-if="sectionTemplate.isEnableSite"
				/>
				<EditorListSection
					v-if="sectionTemplate.isEnableList"
					:section-template="sectionTemplate"
				/>
				<div class="mt-2 flex justify-between">
					<ModalButton
						aria-label="Save"
						v-if="editing"
						:name="'Save'"
						v-on:click="saveSubSection"
						class="mt-2"
					/>
					<ModalButton
						v-if="editing && !prevSubsection.isEmpty"
						aria-label="Cancel"
						:name="'Cancel'"
						v-on:click="cancelSubSection"
						class="mt-2"
					/>
				</div>
			</form>
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
	import EditorSiteSection from '../TimeInterval/EditorSiteSection.vue';
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
	import type { SectionTemplate } from '../../../../models/SectionTemplate';
	const props = defineProps({
		sectionTemplate: {
			type: Object as PropType<SectionTemplate>,
			required: true,
		},
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
		sectionTemplate: SectionTemplate;
		subsection: Subsection;
		editing: Ref<boolean>;
		shake: Ref<boolean>;
	} => {
		return {
			sectionTemplate: props.sectionTemplate,
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
		const prevSubsectionCopy = copySubsection(props.prevSubsection);
		setSubsection(prevSubsectionCopy);
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
	const setSubsection = (subsectionToSet: Subsection) => {
		subsection.title = subsectionToSet.title;
		subsection.text = subsectionToSet.text;
		subsection.last = subsectionToSet.last;
		subsection.editing = subsectionToSet.editing;
		subsection.subsectionTimeInterval =
			subsectionToSet.subsectionTimeInterval;
		subsection.elements = subsectionToSet.elements;
		subsection.count = subsectionToSet.count;
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
			setSubsection(copySubsection(newValue));
		},
		{ deep: true }
	);
</script>
