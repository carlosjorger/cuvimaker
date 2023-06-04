<template>
    <circle-button
        :buttonColor="buttonColor"
        :size="size"
        class="border-4"
        :class="[
            lineColor
                ? `border-[${lineColor}]`
                : 'border-primary dark:border-dark-primary',
                closeButton?'rotate-45':'',
                'border-4'
        ]"
    >
        <div
            :style="{
                backgroundColor: lineColor,
            }"
            class="absolute h-1 w-1/2 rotate-90 rounded-sm bg-primary transition-all duration-300 dark:bg-dark-primary"
        ></div>
        <div
            :style="{
                backgroundColor: lineColor,
            }"
            class="absolute h-1 w-1/2 rotate-180 rounded-sm bg-primary transition-all duration-300 dark:bg-dark-primary"
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
            darklineColor: {
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
