<template>
    <div
        class="fixed top-0 left-0 right-0 bottom-0 flex h-full items-center justify-around justify-self-center bg-[#000000da]"
    >
        <div class="section-card m-0 flex flex-col bg-white">
            <header class="mb-2 flex items-center justify-between">
                <h3 class="text-2xl font-semibold text-[var(--primary-color)]">
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
                    class="mt-2 w-full rounded-3xl border-2 border-solid border-[var(--primary-color)] p-2 font-semibold text-[var(--primary-color)] shadow-xl transition-all duration-300 placeholder:text-lg placeholder:text-[var(--primary-color)] focus:border-4"
                    placeholder="Section Name"
                    type="text"
                />
            </div>
            <div class="mb-2 box-border">
                <transition-group
                    name="subsection"
                    class="relative block h-96 overflow-scroll overflow-x-hidden p-5"
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
            <BasicButton
                class="mx-auto w-full p-2"
                :name="'Add Section'"
                v-on:click="$emit('addSection', section)"
                @click="$emit('close-modal')"
            />
        </div>
    </div>
</template>
<script lang="ts">
    import CloseAddButton from '../../shared/Button/CloseAddButton.vue';
    import SubsectionMenu from '../Subsection/SubsectionMenu.vue';
    import { Section } from '../../../models/Section';
    import BasicButton from '../../shared/Button/BasicButton.vue';

    export default {
        name: 'CreateSectionModal',
        props: {
            showModal: {
                type: Boolean,
                required: true,
            },
        },
        components: { SubsectionMenu, CloseAddButton, BasicButton },

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
