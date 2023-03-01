<template>
    <input
        v-model="value"
        class="block w-full mt-2 bg-inherit border-white text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
        v-if="editing || value"
        :class="{
            ['border-solid border-b-4  pointer-events-auto shadow-xl ']:
                editing,
            ['border-solid border-b-0  pointer-events-none shadow-none ']:
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
