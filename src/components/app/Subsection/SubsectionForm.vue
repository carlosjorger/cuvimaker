<template>
    <input
        v-model="value"
        class="mt-2 block w-full border-white bg-inherit text-white placeholder-gray-500 transition-all duration-300 focus:outline-none"
        v-if="editing || value"
        :class="{
            ['pointer-events-auto border-b-4  border-solid shadow-xl ']:
                editing,
            ['pointer-events-none border-b-0  border-solid shadow-none ']:
                !editing,
        }"
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
