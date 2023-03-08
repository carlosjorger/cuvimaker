<template>
    <button
        type="submit"
        class="mt-2 w-5/12 rounded-3xl bg-white p-2 text-lg font-extrabold text-[var(--primary-color)] transition-colors duration-500"
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
