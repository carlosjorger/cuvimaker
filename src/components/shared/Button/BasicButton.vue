<template>
    <button
        type="submit"
        class="rounded-3xl border-4 border-[var(--primary-color)] bg-[#f6f4fb] p-3 text-xl font-extrabold text-[var(--primary-color)] shadow-xl transition-colors duration-500 active:bg-[#dcdbe0] dark:border-zinc-300 dark:bg-[#190f35] dark:text-zinc-300 dark:active:bg-[#110a24]"
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
