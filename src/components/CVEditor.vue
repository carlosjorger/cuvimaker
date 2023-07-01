<!-- TODO: Save the pdf -->
<!-- Make the website responsive more responsive -->
<template>
    <section>
        <IntroductionSection
            :introduction="resume.introduction"
            :isBeingEditingIntroduction="resume.isBeingEditingIntroduction"
            @set-editing-introduction="setEditingIntroduction"
        />
        <BasicButton
            :name="'Add Section'"
            @click="
                () => {
                    showModal = true;
                    editIndex = undefined;
                }
            "
        />
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
                :isBeingEditingIntroduction="resume.isBeingEditingIntroduction"
                @edit-section="
                    () => {
                        showModal = true;
                        editIndex = index;
                    }
                "
            />
        </ListTransition>
    </section>
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

    export default {
        name: 'CVEditor',
        components: {
            CreateSectionModal,
            SectionComponent,
            BasicButton,
            IntroductionSection,
            ListTransition,
            ConfirmationModal,
        },
        data() {
            return {
                showModal: false,
                editIndex: undefined as number | undefined,
                resume: new Resume(),
                confirmationDeleteModal: false,
                sectionIndexToDelete: -1,
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
        },
    };
</script>
<style>
    article {
        width: 40%;
    }
</style>
