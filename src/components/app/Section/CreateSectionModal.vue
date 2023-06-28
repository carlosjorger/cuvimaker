<template>
    <div
        class="fixed bottom-0 left-0 right-0 top-0 z-10 flex h-full items-center justify-around justify-self-center bg-[#000000da]"
    >
        <div
            class="m-0 flex w-2/5 flex-col rounded-lg border-4 border-primary bg-white p-4 dark:border-zinc-100 dark:bg-dark-primary-300 max-xl:w-1/2 max-lg:w-4/5 max-md:w-5/6 max-sm:w-11/12"
        >
            <header class="mb-2 flex items-center justify-between">
                <h3
                    class="text-2xl font-semibold text-primary dark:text-zinc-300"
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
                    class="mt-2 w-full rounded-3xl border-2 border-solid p-2 font-semibold text-primary shadow-xl transition-all duration-300 placeholder:text-lg focus:border-4 dark:bg-dark-primary-200 dark:text-zinc-300"
                    :class="{
                        'border-red-600 placeholder:text-red-600 dark:border-rose-500 dark:placeholder:text-rose-500 ':
                            v$.section.name.$errors.length > 0,
                        'border-primary placeholder:text-primary dark:border-zinc-300  dark:placeholder:text-zinc-300':
                            v$.section.name.$errors.length <= 0,
                    }"
                    placeholder="Section Name"
                    type="text"
                />
                <ErrorsSection :errors="v$.section.name.$errors" />
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
        </div>
    </div>
</template>
<script lang="ts">
    import CloseAddButton from '../../shared/Button/CloseAddButton.vue';
    import SubsectionMenu from '../Subsection/SubsectionMenu.vue';
    import { Section } from '../../../models/Section';
    import BasicButton from '../../shared/Button/BasicButton.vue';
    import { useVuelidate } from '@vuelidate/core';
    import { helpers, required } from '@vuelidate/validators';
    import { inject, computed } from 'vue';
    import ErrorsSection from '../../shared/Error/ErrorsSection.vue';

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
        },

        data(): { section: Section; sections: Section[] } {
            return {
                ...this.initialState(),
                sections: inject('sections', [] as Section[]),
            };
        },
        provide() {
            return {
                showModal: computed(() => this.showModal),
            };
        },
        methods: {
            anySectionWithThisName() {
                return !this.sections.some(
                    (s, i) => i != this.editIndex && s.name == this.section.name
                );
            },
            initialState(): { section: Section } {
                return {
                    section:
                        !this.isEditing || this.editIndex == undefined
                            ? new Section()
                            : this.sections[this.editIndex].copy(),
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
                this.closeModal();
                this.sections.push(section);
                this.v$.$reset();
            },
            closeModal: function () {
                this.v$.$validate();
                if (this.v$.$error) {
                    return;
                }
                this.$emit('close-modal');
            },
            updateSection: function () {
                if (this.isEditing) {
                    this.v$.$validate();
                    if (this.v$.$error) {
                        return;
                    }
                    this.closeModal();
                    if (this.editIndex != undefined) {
                        // TODO: Set the Subsectionstore
                        this.sections[this.editIndex] = this.section;
                    }
                    this.v$.$reset();
                }
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
        setup() {
            return {
                v$: useVuelidate({ $scope: false }),
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
