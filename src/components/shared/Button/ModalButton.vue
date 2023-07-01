<template>
    <button
        type="submit"
        class="mt-2 w-[45%] rounded-3xl bg-white p-2 text-lg font-extrabold text-primary transition-colors duration-200 ease-in active:bg-[#aea8cd] dark:border-4 dark:bg-dark-primary dark:text-zinc-300 dark:active:bg-[#0c071a]"
    >
        {{ name }}
    </button>
</template>

<script>
    export default {
        name: 'ModalButton',
        props: {
            name: {
                type: String,
            },
        },
    };
</script>
