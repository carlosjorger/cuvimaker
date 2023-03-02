<template>
    <circle-button
        :buttonColor="buttonColor"
        :size="size"
        v-bind:class="{
            'rotate-45': closeButton,
        }"
    >
        <div
            :style="{
                backgroundColor: lineColor,
            }"
            class="absolute h-1 w-1/2 rotate-90 rounded-sm bg-[var(--primary-color)] transition-all duration-300"
        ></div>
        <div
            :style="{
                backgroundColor: lineColor,
            }"
            class="absolute h-1 w-1/2 rotate-180 rounded-sm bg-[var(--primary-color)] transition-all duration-300"
        ></div>
    </circle-button>
</template>
<script lang="ts">
    import CircleButton from './CircleButton.vue';

    export default {
        props: {
            closeButton: {
                type: Boolean,
            },
            lineColor: {
                type: String,
            },
            buttonColor: {
                type: String,
            },
            size: {
                type: Number,
            },
        },
        name: 'CloseAddButton',
        components: { CircleButton },
        methods: {},
    };
</script>
