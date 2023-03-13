<template>
    <button
        type="submit"
        class="rounded-3xl border-4 border-primary bg-[#f6f4fb] p-3 text-xl font-extrabold text-primary shadow-xl transition-colors duration-500 active:bg-[#dcdbe0] dark:border-zinc-300 dark:bg-dark-primary dark:text-zinc-300 dark:active:bg-[#0c071a]"
    >
        {{ name }}
    </button>
</template>

<script lang="ts">
    export default {
        name: 'BasicButton',
        props: {
            name: {
                type: String,
            },
        },
    };
</script>
