<template>
    <div>
        <input
            v-model="value"
            class="block w-full border-solid bg-inherit transition-form duration-300 focus:outline-none dark:placeholder-zinc-400"
            v-if="editing || value"
            :class="[
                `text-${lightColor} dark:text-${darkColor}`,
                editing
                    ? 'pointer-events-auto border-b-4 shadow-xl'
                    : 'pointer-events-none border-b-0 shadow-none',
                errors != undefined && errors.length > 0
                    ? 'border-red-600 placeholder:text-red-600 dark:border-rose-500 dark:placeholder:text-rose-500'
                    : `border-${lightColor} dark:border-${darkColor} placeholder:text-zinc-400 dark:placeholder:text-zinc-300`,
            ]"
            type="text"
            :placeholder="placeholder"
        />
        <ErrorsSection :errors="errors" />
    </div>
</template>

<script lang="ts">
    import type { ErrorObject } from '@vuelidate/core';
    import { inject } from 'vue';
    import ErrorsSection from '../../shared/Error/ErrorsSection.vue';
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
            placeholder: String,
            errors: Object as () => ErrorObject[],
        },
        emits: ['update:modelValue'],
        components: { ErrorsSection },
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
                set(value: string) {
                    this.$emit('update:modelValue', value);
                },
            },
        },
    };
</script>
