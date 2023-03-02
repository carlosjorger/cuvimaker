<template>
    <button
        :style="{
            backgroundColor: buttonColor,
            width: `${size}rem`,
            height: `${size}rem`,
            padding: `${(size ?? 0) / 12}rem`,
        }"
        type="button"
        class="relative m-0.5 flex h-12 w-12 cursor-pointer items-center justify-evenly rounded-full bg-white p-1 transition-all duration-300 ease-in"
    >
        <slot></slot>
    </button>
</template>
<script lang="ts">
    export default {
        props: {
            buttonColor: {
                type: String,
            },
            size: {
                type: Number,
            },
        },
        name: 'CircleButton',
        methods: {},
    };
</script>
