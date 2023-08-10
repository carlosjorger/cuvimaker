<template>
	<div>
		<ShakeTemplate
			:shake="shake"
			v-scroll-if="subsection"
			class="max-ms:p-2 mt-3 w-full rounded-lg bg-primary p-4 text-white shadow-2xl shadow-zinc-200 transition-all duration-500 dark:bg-dark-primary-200 dark:shadow-lg dark:shadow-zinc-500 max-md:p-3"
		>
			<div>
				<div class="flex items-center justify-between">
					<AppearFadeTransition>
						<CloseAddButton
							v-on:click="addRemoveSubSection()"
							:closeButton="!subsection.last"
							v-if="!editing"
						/>
					</AppearFadeTransition>
					<AppearFadeTransition>
						<CircleButtonWithIcon
							v-if="!subsection.last && !editing"
							@click="editSubSection"
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
						v-model="subsection.title"
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
<script lang="ts">
	import CloseAddButton from '../../../shared/Button/CloseAddButton.vue';
	import { Subsection } from '../../../../models/Subsection';
	import mitt from 'mitt';
	import SubsectionForm from '../../../shared/TextArea/BasicTextArea.vue';
	import { scrollSmoothToElement } from '../../../../utils/scrollServices';
	import { useVuelidate } from '@vuelidate/core';
	import { required } from '@vuelidate/validators';
	import EditorTimeIntervalSection from '../TimeInterval/EditorTimeIntervalSection.vue';
	import ModalButton from '../../../shared/Button/ModalButton.vue';
	import EditorListSection from '../List/EditorListSection.vue';
	import { PropType, computed } from 'vue';
	import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
	import CircleButtonWithIcon from '../../../shared/Button/CircleButtonWithIcon.vue';
	import ShakeTemplate from '../../../shared/others/ShakeTemplate.vue';
	import {
		copySubsection,
		isEmptySubsection,
	} from '../../../../extensions/extensions';
	import { useSectionStore } from '../../../../stores/SectionStore';
	import { appStore } from '../../../../store';
	const emitter = mitt();
	//TODO: refactor this component code
	export default {
		name: 'EditorSubsection',
		props: {
			prevSubsection: {
				type: Object as PropType<Subsection>,
				required: true,
			},
			subsectionIndex: {
				type: Number,
				required: true,
			},
		},
		components: {
			CloseAddButton,
			SubsectionForm,
			EditorTimeIntervalSection,
			ModalButton,
			EditorListSection,
			AppearFadeTransition,
			CircleButtonWithIcon,
			ShakeTemplate,
		},
		setup() {
			const sectionStore = useSectionStore(appStore);

			return {
				v$: useVuelidate({ $scope: true }),
				sectionStore,
			};
		},
		directives: {
			scrollIf(el: Element, { value }) {
				if (value.last) {
					scrollSmoothToElement(el);
				}
			},
		},
		data(): {
			subsection: Subsection;
			editing: boolean;
			shake: boolean;
		} {
			return this.initialState();
		},
		provide() {
			return {
				subsection: computed(() => this.subsection),
				editing: computed(() => this.editing),
			};
		},
		mounted() {
			emitter.on('editing', (index) => {
				this.tryingGoToThisSubsection(index as number);
			});
		},
		methods: {
			initialState(): {
				subsection: Subsection;
				editing: boolean;
				shake: boolean;
			} {
				return {
					subsection: isEmptySubsection(this.prevSubsection)
						? new Subsection()
						: copySubsection(this.prevSubsection),
					editing: false,
					shake: false,
				};
			},
			tryingGoToThisSubsection(index: number) {
				if (index == this.subsectionIndex) {
					scrollSmoothToElement(this.$el);
					this.shakeSubsection();
				}
			},
			resetWindow: function () {
				this.v$.$reset();
				Object.assign(this.$data, this.initialState());
			},
			addRemoveSubSection() {
				if (this.subsection.last) {
					this.resetWindow();
					this.addSubSection();
				} else if (this.sectionStore.subsectionEditing) {
					this.emmitSendEditing();
				} else {
					this.$emit('show-confirmation-to-delete');
				}
			},
			addSubSection() {
				if (this.sectionStore.subsectionEditing) {
					this.emmitSendEditing();
				} else {
					this.sectionStore.addNewSubsection();
				}
			},
			saveSubSection() {
				this.validate();
				if (this.v$.$error) {
					return;
				}
				this.v$.$reset();
				this.sectionStore.removeSubsection;
				this.sectionStore.setSubsection(
					this.subsectionIndex,
					copySubsection(this.subsection)
				);
				this.sectionStore.disabledEditing();
			},
			cancelSubSection() {
				this.subsection = copySubsection(this.prevSubsection);
				this.sectionStore.disabledEditing();
			},
			validate() {
				this.v$.$validate();
			},
			editSubSection() {
				if (this.sectionStore.subsectionEditing) {
					this.emmitSendEditing();
				} else {
					this.setEditingIndexToThisSubsection();
				}
			},
			setEditingIndexToThisSubsection() {
				this.sectionStore.setEditingIndex(this.subsectionIndex);
			},
			emmitSendEditing() {
				emitter?.emit('editing', this.sectionStore.editingIndex);
			},
			shakeSubsection() {
				this.shake = true;
				setTimeout(() => {
					this.shake = false;
				}, 1500);
			},
		},

		validations: {
			subsection: {
				title: {
					required,
				},
			},
		},
		watch: {
			'sectionStore.editingIndex'(newValue: number) {
				this.editing = newValue == this.subsectionIndex;
			},
			'prevSubsection.last'(newValue: boolean) {
				this.subsection.last = newValue;
			},
			prevSubsection(newValue: Subsection) {
				this.subsection.setSubsection(newValue);
			},
			section() {
				this.resetWindow();
			},
		},
	};
</script>
