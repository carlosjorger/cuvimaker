<template>
    <button
        type="submit"
        class="mt-2 w-5/12 rounded-lg bg-white p-2 text-[var(--primary-color)] transition-colors duration-500"
        v-on:click="saveSubSection"
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
