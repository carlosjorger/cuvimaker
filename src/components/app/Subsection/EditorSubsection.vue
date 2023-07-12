<template>
	<div>
		<ShakeTemplate
			:shake="shake"
			v-scroll-if="subsection"
			class="max-ms:p-2 mt-3 w-full rounded-lg bg-primary p-4 text-white shadow-2xl shadow-zinc-200 transition-all duration-500 dark:bg-dark-primary-200 dark:shadow-lg dark:shadow-zinc-500 max-md:p-2"
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
							:width="2.5"
							color="var(--primary-color)"
							icon="ic:baseline-mode-edit"
						/>
					</AppearFadeTransition>
				</div>
				<form
					v-on:submit.prevent
					v-if="!subsection.last"
					class="max-ms:p-1 p-5 max-md:p-2"
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
					<SubsectionTimeIntervalSection
						v-model="subsection.subsectionTimeInterval"
					/>
					<SubsectionListSection />
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
	import CloseAddButton from '../../shared/Button/CloseAddButton.vue';
	import { Subsection } from '../../../models/Subsection';
	import { Section } from '../../../models/Section';
	import mitt from 'mitt';
	import SubsectionForm from './SubsectionForm.vue';
	import { scrollSmoothToElement } from '../../../utils/scrollServices';
	import { useVuelidate } from '@vuelidate/core';
	import { required } from '@vuelidate/validators';
	import SubsectionTimeIntervalSection from '../TimeInterval/EditorTimeIntervalSection.vue';
	import ModalButton from '../../shared/Button/ModalButton.vue';
	import SubsectionListSection from '../List/EditorListSection.vue';
	import { computed } from 'vue';
	import AppearFadeTransition from '../../shared/Transition/AppearFadeTransition.vue';
	import CircleButtonWithIcon from '../../shared/Button/CircleButtonWithIcon.vue';
	import ShakeTemplate from '../../shared/others/ShakeTemplate.vue';
	import {
		copySubsection,
		isEmptySubsection,
	} from '../../../extensions/extensions';
	const emitter = mitt();
	export default {
		name: 'EditorSubsection',
		props: {
			section: {
				type: Section,
				required: true,
			},
			prevSubsection: {
				type: Subsection,
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
			SubsectionTimeIntervalSection,
			ModalButton,
			SubsectionListSection,
			AppearFadeTransition,
			CircleButtonWithIcon,
			ShakeTemplate,
		},
		setup() {
			return {
				v$: useVuelidate({ $scope: true }),
			};
		},
		directives: {
			scrollIf(el: Element, { value }) {
				if (value.last) {
					scrollSmoothToElement(el);
				}
			},
		},
		data() {
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
				if (index == this.subsectionIndex) {
					scrollSmoothToElement(this.$el);
					this.shakeSubsection();
				}
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
			resetWindow: function () {
				this.v$.$reset();
				Object.assign(this.$data, this.initialState());
			},
			addRemoveSubSection() {
				if (this.subsection.last) {
					this.resetWindow();
					this.addSubSection();
				} else if (this.section.subsectionEditing) {
					this.emmitSendEditing();
				} else {
					this.$emit('show-confirmation-to-delete');
				}
			},
			addSubSection() {
				if (this.section.subsectionEditing) {
					this.emmitSendEditing();
				} else {
					this.section.addNewSubsection();
				}
			},
			saveSubSection() {
				this.validate();
				if (this.v$.$error) {
					return;
				}
				this.v$.$reset();
				this.prevSubsection.setSubsection(this.subsection);
				this.disabledEditing();
			},
			cancelSubSection() {
				this.subsection.setSubsection(this.prevSubsection);
				this.disabledEditing();
			},
			validate() {
				this.v$.$validate();
			},
			disabledEditing() {
				this.section.disabledEditing();
			},

			editSubSection() {
				if (this.section.subsectionEditing) {
					this.emmitSendEditing();
				} else {
					this.setEditingIndex();
				}
			},
			setEditingIndex() {
				this.section.setEditingIndex(this.subsectionIndex);
			},
			emmitSendEditing() {
				emitter?.emit('editing', this.section.editingIndex);
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
			'section.editingIndex'(newValue: number) {
				this.editing = newValue == this.subsectionIndex;
			},
			'prevSubsection.last'(newValue: boolean) {
				this.subsection.last = newValue;
			},
			section() {
				this.resetWindow();
			},
		},
	};
</script>
