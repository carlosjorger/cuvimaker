<!-- TODO: Save the pdf -->
<!-- TODO: Save the cv in the sotarage -->
<template>
	<div
		class="dark:border-3 overflow-hidden rounded-lg border-4 border-primary bg-primary dark:border-zinc-300 dark:bg-dark-primary"
	>
		<EditorBar v-model="isEditingResume" />

		<div
			class="dark:border-t-3 max-h-[calc(100vh-18rem)] min-h-[calc(100vh-18rem)] overflow-scroll overflow-x-hidden border-t-4 border-primary bg-[#eee8ff] p-6 dark:border-zinc-300 dark:bg-[#130624] max-md:p-2"
		>
			<AppearFadePanelTransition>
				<section v-show="isEditingResume" class="relative">
					<IntroductionSection
						:introduction="resume.introduction"
						:isBeingEditingIntroduction="
							resume.isBeingEditingIntroduction
						"
						@set-editing-introduction="setEditingIntroduction"
						@set-introduction="setIntroduction"
					/>
					<SubsectionAlign>
						<BasicButton
							:name="'Add Section'"
							@click="
								() => {
									showModal = true;
									editIndex = undefined;
								}
							"
						/>
					</SubsectionAlign>

					<create-section-modal
						v-show="showModal"
						:sections="resume.sections"
						:showModal="showModal"
						@close-modal="showModal = false"
						:editIndex="editIndex"
					/>
					<ConfirmationModal
						:entity-to-delete="'Section'"
						v-show="confirmationDeleteModal"
						@delete="deleteSection(sectionIndexToDelete)"
						@cancel="confirmationDeleteModal = false"
					/>
					<ListTransition class="z-0 block">
						<section-component
							v-for="(section, index) in resume.sections"
							:section="section"
							:key="section.name"
							@delete-section="confirmDeleteSection(index)"
							:isBeingEditingIntroduction="
								resume.isBeingEditingIntroduction
							"
							@edit-section="
								() => {
									showModal = true;
									editIndex = index;
								}
							"
						/>
					</ListTransition>
				</section>
			</AppearFadePanelTransition>
			<PreviewResume
				class="relative"
				:canShowPreviewResume="!isEditingResume"
				:resume="resume"
			/>
		</div>
	</div>
</template>
<script lang="ts">
	import { Resume } from '../models/Resume';
	import CreateSectionModal from './app/Section/CreateSectionModal.vue';
	import SectionComponent from './app/SectionView/SectionComponent.vue';
	import BasicButton from './shared/Button/BasicButton.vue';
	import { computed } from 'vue';
	import IntroductionSection from './app/SectionView/Introduction/IntroductionSection.vue';
	import ListTransition from './shared/Transition/ListTransition.vue';
	import ConfirmationModal from './shared/Modal/ConfirmationModal.vue';
	import SubsectionAlign from './shared/Subsection/SubsectionAlign.vue';
	import EditorBar from './app/Editor/EditorBar.vue';
	import PreviewResume from './app/Editor/PreviewResume.vue';
	import type { Introduction } from '../models/Introduction';
	import AppearFadePanelTransition from './shared/Transition/AppearFadePanelTransition.vue';

	export default {
		name: 'CVEditor',
		components: {
			CreateSectionModal,
			SectionComponent,
			BasicButton,
			IntroductionSection,
			ListTransition,
			ConfirmationModal,
			SubsectionAlign,
			AppearFadePanelTransition,
			EditorBar,
			PreviewResume,
		},
		data() {
			return {
				showModal: false,
				editIndex: undefined as number | undefined,
				resume: new Resume(),
				confirmationDeleteModal: false,
				sectionIndexToDelete: -1,
				isEditingResume: true,
			};
		},
		provide() {
			return {
				sections: computed(() => this.resume.sections),
			};
		},
		methods: {
			confirmDeleteSection(index: number) {
				this.confirmationDeleteModal = true;
				this.sectionIndexToDelete = index;
			},
			deleteSection(index: number) {
				this.resume.sections.splice(index, 1);
				this.confirmationDeleteModal = false;
			},
			setEditingIntroduction(value: boolean) {
				this.resume.isBeingEditingIntroduction = value;
			},
			setIntroduction(introduction: Introduction) {
				this.resume.introduction = introduction;
			},
		},
	};
</script>
<style>
	article {
		width: 40%;
	}
</style>
