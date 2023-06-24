<template>
    <circle-button
        :buttonColor="buttonColor"
        :size="size"
        class="border-4 border-solid"
        :class="[
            `border-${lineColor} dark:border-${darklineColor}`,
            closeButton ? 'rotate-45' : '',
        ]"
    >
        <div
            :class="[`bg-${lineColor} dark:bg-${darklineColor}`]"
            class="absolute h-1 w-1/2 rotate-90 rounded-sm transition-all duration-300"
        ></div>
        <div
            :class="[`bg-${lineColor} dark:bg-${darklineColor}`]"
            class="absolute h-1 w-1/2 rotate-180 rounded-sm transition-all duration-300"
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
                default: 'primary',
            },
            darklineColor: {
                type: String,
                default: 'dark-primary',
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
