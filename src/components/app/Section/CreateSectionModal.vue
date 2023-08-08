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
					<subsection-menu
						ref="editorSubsection"
						v-for="(subsection, index) in section.subsections"
						:key="subsection.id"
						:subsectionIndex="index"
						:section="section"
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
				class="mx-auto w-full p-2"
				:name="'Add Section'"
				v-on:click="addSection(section)"
			/>
			<BasicButton
				v-if="isEditing"
				class="mx-auto w-full p-2"
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
<script lang="ts">
	import CloseAddButton from '../../shared/Button/CloseAddButton.vue';
	import SubsectionMenu from '../Editor/Subsection/EditorSubsection.vue';
	import { Section } from '../../../models/Section';
	import BasicButton from '../../shared/Button/BasicButton.vue';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers, required } from '@vuelidate/validators';
	import { inject, computed } from 'vue';
	import ErrorsSection from '../../shared/Error/ErrorsSection.vue';
	import ModalTemplate from '../../shared/others/ModalTemplate.vue';
	import ConfirmationModal from '../../shared/Modal/ConfirmationModal.vue';
	import { useResumeStore } from '../../../stores/resumeStore';
	import { appStore } from '../../../store';

	export default {
		name: 'CreateSectionModal',
		props: {
			showModal: {
				type: Boolean,
				required: true,
			},
			editIndex: {
				type: Number,
			},
		},
		components: {
			SubsectionMenu,
			CloseAddButton,
			BasicButton,
			ErrorsSection,
			ModalTemplate,
			ConfirmationModal,
		},
		setup() {
			const resumeStore = useResumeStore(appStore);

			return {
				v$: useVuelidate({ $scope: false }),
				resumeStore,
			};
		},
		data(): {
			section: Section;
			confirmationDeleteModal: boolean;
			selectedSectionIndex: number;
		} {
			return {
				...this.initialState(),
			};
		},
		provide() {
			return {
				showModal: computed(() => this.showModal),
			};
		},
		methods: {
			anySectionWithThisName() {
				return this.resumeStore.anySectionWithThisName(
					this.editIndex,
					this.section.name
				);
			},
			initialState(): {
				section: Section;
				confirmationDeleteModal: boolean;
				selectedSectionIndex: number;
			} {
				let section = new Section();
				if (this.editIndex != undefined && this.isEditing) {
					const tempSection = this.resumeStore.getSection(
						this.editIndex
					);
					section = new Section(
						tempSection.name,
						tempSection.subsections,
						tempSection.count
					);
				}
				return {
					section: section,
					confirmationDeleteModal: false,
					selectedSectionIndex: 0,
				};
			},
			resetWindow: function () {
				Object.assign(this.$data, this.initialState());
			},
			addSection: function (section: Section) {
				this.v$.$validate();
				if (this.v$.$error) {
					return;
				}
				this.resumeStore.addSection(section);
				this.closeModal();
				this.v$.$reset();
			},
			closeModal: function () {
				this.$emit('close-modal');
			},
			updateSection: function () {
				if (this.section.editingIndex != -1) {
					(
						this.$refs.editorSubsection as (typeof SubsectionMenu)[]
					).forEach((subsectionChild) => {
						subsectionChild.tryingGoToThisSubsection(
							this.section.editingIndex
						);
					});
				} else if (this.isEditing) {
					this.v$.$validate();
					if (this.v$.$error) {
						return;
					}
					if (this.editIndex != undefined) {
						this.resumeStore.setSection(
							this.editIndex,
							this.section
						);
					}
					this.v$.$reset();
					this.closeModal();
				}
			},
			removeSubsection() {
				this.confirmationDeleteModal = false;
				this.section.removeSubsection(this.selectedSectionIndex);
			},
		},
		validations() {
			return {
				section: {
					name: {
						required,
						anySectionWithThisName: helpers.withMessage(
							'Cannot have a Section with the same name',
							this.anySectionWithThisName
						),
					},
				},
			};
		},

		watch: {
			showModal(newValue) {
				if (newValue) {
					this.resetWindow();
				}
			},
		},
		computed: {
			isEditing: function () {
				return this.editIndex != undefined;
			},
		},
	};
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
