<!-- TODO: show confirmation messages when you delete a entity -->
<!-- TODO: Save the pdf -->
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

        <transition name="createSectionModal">
            <create-section-modal
                v-show="showModal"
                :sections="resume.sections"
                :showModal="showModal"
                @close-modal="showModal = false"
                :editIndex="editIndex"
            />
        </transition>
        <transition name="createSectionModal">
            <ModalTemplate v-show="confirmationDeleteModal">
                <div
                    class="overflow-hidden rounded bg-white font-bold text-primary dark:border-zinc-100 dark:bg-dark-primary-300 dark:text-zinc-300"
                >
                    <div
                        class="bg-dark-primary-300 p-4 text-zinc-300 dark:bg-white dark:text-primary"
                    >
                        Confirmation
                    </div>
                    <div class="max-w-sm p-4">
                        <div class="text-sm">
                            A you sure that you whant to delete this Section?
                        </div>

                        <div class="flex justify-between pt-5">
                            <button
                                class="rounded-2xl bg-dark-primary-300 px-6 py-2 text-sm font-bold text-zinc-300 dark:bg-white dark:text-primary"
                                @click="confirmationDeleteModal = false"
                            >
                                No
                            </button>

                            <button
                                class="rounded-2xl bg-dark-primary-300 px-6 py-2 text-sm font-bold text-zinc-300 dark:bg-white dark:text-primary"
                                @click="deleteSection(sectionIndexToDelete)"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </ModalTemplate>
        </transition>
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
    import ModalTemplate from './shared/others/ModalTemplate.vue';
    export default {
        name: 'CVEditor',
        components: {
            CreateSectionModal,
            SectionComponent,
            BasicButton,
            IntroductionSection,
            ListTransition,
            ModalTemplate,
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
    .createSectionModal-leave-active {
        transition: all 0.5s ease;
    }
    .createSectionModal-enter-active {
        transition: all 0.5s ease;
    }
    .createSectionModal-leave-to,
    .createSectionModal-enter-from {
        transform: translateY(-1rem);
        opacity: 0;
    }
</style>
