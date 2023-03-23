<template>
    <div
        class="m-2 flex w-11/12 items-center justify-end rounded-lg border-solid border-white p-1 shadow-xl transition-all duration-300 ease-linear"
        :class="{
            ['border-4']: editingElement && selecting && editing,
            ['bg-[#664596] dark:bg-[#49387a]']: selecting && editing,
            ['bg-[var(--primary-form-color)] dark:bg-dark-primary-light']:
                !selecting || !editing,
        }"
        @click="selectElement"
    >
        <textarea
            ref="element"
            :id="index.toString()"
            v-model="currentElement"
            class="pointer-events-none w-9/12 resize-none overflow-hidden border-0 bg-inherit p-2 text-white focus:outline-none"
            :class="{
                ['pointer-events-auto']: editingElement && selecting && editing,
            }"
            rows="1"
            @input="changeTextArea"
        ></textarea>
        <div class="w-1/4"></div>
        <Transition>
            <div
                v-if="selecting && editingElement"
                class="absolute flex items-center"
            >
                <circle-button :size="2.2" @click="saveElement" v-if="editing">
                    <Icon
                        icon="el:ok"
                        width="23"
                        color="var(--primary-color)"
                    />
                </circle-button>
                <circle-button
                    :size="2.2"
                    @click="cancelElement"
                    v-if="editing"
                >
                    <Icon
                        icon="mdi:cancel-bold"
                        width="23"
                        color="var(--primary-color)"
                    />
                </circle-button>
            </div>
        </Transition>
        <Transition>
            <div
                v-if="selecting && !editingElement"
                class="absolute flex items-center"
            >
                <circle-button :size="2.2" @click="editElement" v-if="editing">
                    <Icon
                        icon="ic:baseline-edit"
                        width="22"
                        color="var(--primary-color)"
                    />
                </circle-button>
                <circle-button
                    :size="2.2"
                    @click="deleteElement"
                    v-if="editing"
                >
                    <Icon
                        icon="ic:baseline-delete"
                        width="22"
                        color="var(--primary-color)"
                    />
                </circle-button></div
        ></Transition>
    </div>
</template>
<script lang="ts">
    import CircleButton from '../../../shared/Button/CircleButton.vue';
    import { Icon } from '@iconify/vue';
    import { inject, ref } from 'vue';
    import { Subsection } from '../../../../models/Subsection';

    export default {
        name: 'SubsectionElement',
        props: {
            selecting: {
                type: Boolean,
                required: true,
            },

            element: {
                type: String,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            },
        },
        emits: ['selectElement'],
        components: { CircleButton, Icon },
        data() {
            return {
                editing: inject('editing', false),
                subsection: inject('subsection', new Subsection()),
                currentElement: '',
                editingElement: false,
            };
        },
        setup() {
            const fileInput = ref<HTMLInputElement | null>(null);
            return {
                fileInput,
            };
        },

        methods: {
            changeTextArea() {
                var textArea = this.$refs.element as HTMLInputElement | null;

                if (textArea) {
                    textArea!.style.height = '0px';
                    textArea!.style.height = textArea?.scrollHeight + 'px';
                }
            },
            deleteElement() {
                this.subsection.elements.splice(this.index, 1);
            },
            editElement() {
                this.editingElement = true;
                this.fileInput?.focus();
            },
            saveElement() {
                this.subsection.elements[this.index].name = this.currentElement;
                this.editingElement = false;
            },
            selectElement() {
                if (!this.editingElement && this.editing) {
                    this.$emit('selectElement');
                }
            },
            cancelElement() {
                this.resetElementValue();
            },
            resetElementValue() {
                this.currentElement = this.element;
                this.editingElement = false;
            },
        },
        mounted() {
            this.changeTextArea();
            this.resetElementValue();
        },
        watch: {
            selecting(newValue: boolean) {
                if (!newValue) {
                    this.cancelElement();
                }
            },
            editing(newValue: boolean) {
                if (!newValue) {
                    this.resetElementValue();
                }
            },
            currentElement() {
                this.$nextTick(() => {
                    this.changeTextArea();
                });
            },
        },
    };
</script>

<style>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>
