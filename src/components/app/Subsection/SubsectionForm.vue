<template>
    <input
        v-model="value"
        class="mt-2 block w-full border-solid bg-inherit placeholder-gray-500 transition-form duration-300 focus:outline-none"
        v-if="editing || value"
        :class="[
            `border-${lightColor} dark:border-${darkColor} text-${lightColor} dark:text-${darkColor}`,
            editing
                ? 'pointer-events-auto border-b-4 shadow-xl'
                : 'pointer-events-none border-b-0 shadow-none',
        ]"
        type="text"
    />
</template>

<script lang="ts">
    import { inject } from 'vue';

    export default {
        name: 'SubsectionForm',
        props: {
            modelValue: {
                type: String,
            },
            lightColor: {
                type: String,
                default: 'white',
            },
            darkColor: {
                type: String,
                default: 'white',
            },
        },
        emits: ['update:modelValue'],
        data() {
            return {
                editing: inject('editing', false),
            };
        },
        computed: {
            value: {
                get() {
                    return this.modelValue;
                },
                set(value: String) {
                    this.$emit('update:modelValue', value);
                },
            },
        },
    };
</script>
