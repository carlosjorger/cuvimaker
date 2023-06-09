<template>
    <div
        class="mt-2 flex justify-between rounded-3xl border-2 border-solid border-white bg-[var(--primary-form-color)] p-1.5 shadow-xl dark:bg-dark-primary"
        v-if="editing"
    >
        <textarea
            id="newElement"
            v-model="newElement"
            class="w-4/5 resize-none overflow-hidden bg-inherit p-2 text-white outline-none"
            placeholder="New element"
            rows="1"
            @input="changeTextArea"
        ></textarea>
        <close-add-button :size="2.2" v-on:click="addElement()" />
    </div>
    <!-- TODO close this error -->
    <div v-for="error of v$.newElement.$errors" :key="error.$uid">
        <div class="error-msg">{{ error.$message }}</div>
    </div>
    <transition-group
        name="subsection-elements"
        class="subsection-elements-list"
        tag="div"
    >
        <SubsectionElement
            v-for="(element, index) in subsection.elements"
            :key="element.id"
            @selectElement="
                selectedElement = selectedElement != index ? index : undefined
            "
            @changeElement="changeElement"
            @removeElement="removeElement"
            :index="index"
            v-bind="$attrs"
            :selecting="selectedElement == index"
            :element="element.name"
        />
    </transition-group>
</template>

<script lang="ts">
    import { Subsection } from '../../../../models/Subsection';
    import CloseAddButton from '../../../shared/Button/CloseAddButton.vue';
    import SubsectionElement from './SubsectionElement.vue';
    import { required, helpers } from '@vuelidate/validators';
    import { useVuelidate } from '@vuelidate/core';
    import { inject } from 'vue';
    export default {
        name: 'SubsectionElements',
        emits: ['changeElement', 'removeElement'],
        components: {
            CloseAddButton,
            SubsectionElement,
        },

        setup() {
            return { v$: useVuelidate({ $scope: false }) };
        },
        data() {
            return {
                ...this.initialState(),
                editing: inject('editing', false),
                subsection: inject('subsection', new Subsection()),
            };
        },

        mounted() {
            this.changeTextArea();
        },
        methods: {
            initialState(): {
                newElement: String;
                selectedElement: number | undefined;
            } {
                return {
                    newElement: '',
                    selectedElement: true ? undefined : 0,
                };
            },
            hasAtLeastOneElement() {
                return (
                    this.subsection.elements.length > 0 ||
                    this.newElement.length > 0
                );
            },
            changeElement(v: string, index: number) {
                this.$emit('changeElement', v, index);
            },
            removeElement(index: number) {
                this.$emit('removeElement', index);
            },
            changeTextArea() {
                var input = document.getElementById(
                    'newElement'
                ) as HTMLInputElement | null;
                if (input) {
                    input!.style.height = '0px';
                    input!.style.height = input?.scrollHeight + 'px';
                }
            },
            addElement() {
                this.v$.$touch();
                if (!this.v$.$error) {
                    this.addElementIntoSubsection(this.newElement);
                    this.newElement = '';
                    this.v$.$reset();
                }
            },
            addElementIntoSubsection(newElement: string) {
                this.subsection.addElement(newElement);
            },
        },
        validations() {
            return {
                newElement: {
                    required,
                    hasAtLeastOneElement: helpers.withMessage(
                        "Doesn't has a least one element",
                        this.hasAtLeastOneElement
                    ),
                },
            };
        },
        watch: {
            editing(newValue: boolean) {
                if (!newValue) {
                    this.v$.$reset();
                }
            },
        },
    };
</script>

<style>
    .subsection-elements-move {
        transition: all 0.5s ease;
    }
    .subsection-elements-leave-active {
        transition: all 0.5s ease;
    }
    .subsection-elements-enter-active {
        transition: all 0.5s ease;
    }
    .subsection-elements-enter-from,
    .subsection-elements-leave-to {
        opacity: 0;
        transform: translateX(-1rem);
    }
    .subsection-elements-leave-active {
        position: absolute;
    }
    .subsection-elements-list {
        position: relative;
        display: block;
    }
</style>
