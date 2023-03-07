<template>
    <section>
        <div class="save-btn">
            <BasicButton :name="'Add Section'" @click="showModal = true" />
        </div>
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

        <div v-for="section in sections">
            <section-component :section="section" />
        </div>
    </section>
</template>
<script lang="ts">
    import type { Section } from '../models/Section';
    import CreateSectionModal from './app/Section/CreateSectionModal.vue';
    import SectionComponent from './app/SectionView/SectionComponent.vue';
    import BasicButton from './shared/Button/BasicButton.vue';
    export default {
        components: { CreateSectionModal, SectionComponent, BasicButton },
        data() {
            return {
                showModal: false,
                sections: [] as Section[],
            };
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
