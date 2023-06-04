<template>
    <section>
        <IntroductionSection :introduction="resume.introduction"/>
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
        <transition-group name="sectionComponent" class="block" tag="div">
            <section-component
                v-for="(section, index) in resume.sections"
                :section="section"
                :key="section.name"
                @delete-section="deleteSection(index)"
                @edit-section="
                    () => {
                        showModal = true;
                        editIndex = index;
                    }
                "
            />
        </transition-group>
    </section>
</template>
<script lang="ts">
    import { Resume } from '../models/Resume';

    import CreateSectionModal from './app/Section/CreateSectionModal.vue';
    import SectionComponent from './app/SectionView/SectionComponent.vue';
    import BasicButton from './shared/Button/BasicButton.vue';
    import { computed } from 'vue';
    import { Introduction } from '../models/Introduction';
    import IntroductionSection from './app/Introduction/IntroductionSection.vue';
    export default {
        name: 'CVEditor',
        components: { CreateSectionModal, SectionComponent, BasicButton, IntroductionSection },
        data() {
            return {
                showModal: false,
                editIndex: undefined as number | undefined,
                resume: new Resume(),
            };
        },
        provide() {
            return {
                sections: computed(() => this.resume.sections),
            };
        },
        methods: {
            deleteSection(index: number) {
                this.resume.sections.splice(index, 1);
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

    .sectionComponent-move {
        transition: all 0.5s ease;
    }
    .sectionComponent-leave-active {
        transition: all 0.5s ease;
    }
    .sectionComponent-enter-active {
        transition: all 0.5s ease;
    }
    .sectionComponent-enter-from,
    .sectionComponent-leave-to {
        opacity: 0;
        transform: translateX(-1rem);
    }
    .sectionComponent-leave-active {
        position: absolute;
    }
</style>
