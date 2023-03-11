<template>
    <section>
        <BasicButton :name="'Add Section'" @click="showModal = true" />

        <transition name="createSectionModal">
            <create-section-modal
                @addSection="(section:Section)=>{
          sections.push(section)
        }"
                v-show="showModal"
                :sections="sections"
                :showModal="showModal"
                @close-modal="showModal = false"
            />
        </transition>
        <transition-group name="sectionComponent" class="block" tag="div">
            <section-component
                v-for="(section, index) in sections"
                :section="section"
                :key="section.name"
                @delete-section="deleteSection(index)"
            />
        </transition-group>
    </section>
</template>
<script lang="ts">
    import type { Section } from '../models/Section';
    import CreateSectionModal from './app/Section/CreateSectionModal.vue';
    import SectionComponent from './app/SectionView/SectionComponent.vue';
    import BasicButton from './shared/Button/BasicButton.vue';
    import { computed } from 'vue';

    export default {
        components: { CreateSectionModal, SectionComponent, BasicButton },
        data() {
            return {
                showModal: false,
                sections: [] as Section[],
            };
        },
        provide() {
            return {
                sections: computed(() => this.sections),
            };
        },
        methods: {
            deleteSection(index: number) {
                this.sections.splice(index, 1);
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
