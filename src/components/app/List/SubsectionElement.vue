<template>
    <div
        class="m-2 flex w-11/12 items-center justify-end rounded-lg border-solid border-white p-1 shadow-xl transition-all duration-300 ease-linear"
        :class="{
            ['border-4']: editingElement && selecting && editing,
            ['bg-[#664596] dark:bg-[#49387a]']: selecting && editing,
            ['bg-[var(--primary-form-color)] dark:bg-dark-primary']:
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
        <AppearFadeTransition>
            <div
                v-if="selecting && editingElement"
                class="absolute flex items-center"
            >
                <CircleButtonWithIcon
                    v-if="editing"
                    @click="saveElement"
                    color="var(--primary-color)"
                    icon="el:ok"
                />
                <CircleButtonWithIcon
                    v-if="editing"
                    @click="cancelElement"
                    color="var(--primary-color)"
                    icon="mdi:cancel-bold"
                />
            </div>
        </AppearFadeTransition>
        <AppearFadeTransition>
            <div
                v-if="selecting && !editingElement"
                class="absolute flex items-center"
            >
                <CircleButtonWithIcon
                    v-if="editing"
                    @click="editElement"
                    color="var(--primary-color)"
                    icon="ic:baseline-edit"
                />
                <CircleButtonWithIcon
                    v-if="editing"
                    @click="deleteElement"
                    color="var(--primary-color)"
                    icon="ic:baseline-delete"
                />
            </div>
        </AppearFadeTransition>
    </div>
</template>
<script lang="ts">
    import { inject, ref } from 'vue';
    import { Subsection } from '../../../models/Subsection';
    import AppearFadeTransition from '../../shared/Transition/AppearFadeTransition.vue';
    import CircleButtonWithIcon from '../../shared/Button/CircleButtonWithIcon.vue';

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
        components: {
            AppearFadeTransition,
            CircleButtonWithIcon,
        },
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
                    textArea.style.height = '0px';
                    textArea.style.height = textArea?.scrollHeight + 'px';
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
            element(element: string) {
                this.currentElement = element;
            },
        },
    };
</script>
