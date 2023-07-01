<!-- TODO: Add animation when this buttons are active-->

<template>
    <button
        type="submit"
        class="mt-2 w-[45%] rounded-3xl bg-white p-2 text-lg font-extrabold text-primary transition-colors duration-500 dark:border-4 dark:bg-dark-primary dark:text-zinc-300"
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
