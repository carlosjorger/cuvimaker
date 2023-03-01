<template>
    <div
        class="flex fixed top-0 left-0 right-0 bottom-0 justify-self-center bg-[#000000da] items-center justify-around h-full"
    >
        <div class="flex flex-col m-0 bg-white section-card">
            <header class="flex mb-2 justify-between items-center">
                <h3 class="text-[var(--primary-color)] text-2xl font-semibold">
                    Add a Section
                </h3>
                <close-add-button
                    v-on:click="$emit('close-modal')"
                    :closeButton="true"
                    :lineColor="'#FFFFFF'"
                    :buttonColor="'var(--primary-color)'"
                />
            </header>
            <div class="mb-2 box-border">
                <input
                    v-model="section.name"
                    class="mt-2 p-2 text-[var(--primary-color)] font-semibold focus:border-4 placeholder:text-[var(--primary-color)] placeholder:text-lg border-solid border-[var(--primary-color)] border-2 w-full rounded-3xl shadow-xl transition-all duration-300"
                    placeholder="Section Name"
                    type="text"
                />
            </div>
            <div class="mb-2 box-border">
                <transition-group
                    name="subsection"
                    class="block h-96 overflow-scroll overflow-x-hidden relative p-5"
                    tag="div"
                >
                    <subsection-menu
                        v-for="(subsection, index) in section.subsections"
                        :key="subsection.id"
                        :subsectionIndex="index"
                        :section="section"
                        :prevSubsection="subsection"
                    />
                </transition-group>
            </div>
            <button
                v-on:click="$emit('addSection', section)"
                class="p-2 mx-auto w-full"
                @click="$emit('close-modal')"
            >
                Add Section
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import CloseAddButton from '../../shared/Button/CloseAddButton.vue';
import SubsectionMenu from '../Subsection/SubsectionMenu.vue';
import { Section } from '../../../models/Section';
import type { PropType } from 'vue';
export default {
    name: 'CreateSectionModal',
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
    },
    components: { SubsectionMenu, CloseAddButton },

    data(): { section: Section } {
        return this.initialState();
    },
    methods: {
        initialState(): { section: Section } {
            return {
                section: new Section(),
            };
        },
        resetWindow: function () {
            Object.assign(this.$data, this.initialState());
        },
    },

    watch: {
        showModal(newValue) {
            if (newValue) {
                this.resetWindow();
            }
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
