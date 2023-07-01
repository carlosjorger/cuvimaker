<template>
    <ModalTemplate>
        <div
            class="overflow-hidden rounded border-4 border-solid border-primary bg-white text-lg font-extrabold text-primary dark:border-zinc-100 dark:bg-dark-primary-300 dark:text-zinc-300"
        >
            <div
                class="bg-primary p-4 text-2xl text-zinc-300 dark:bg-white dark:text-primary"
            >
                Confirmation
            </div>
            <div class="max-w-sm p-4">
                <div>
                    A you sure that you whant to delete this
                    {{ entityToDelete }}?
                </div>

                <div class="flex justify-between pt-5">
                    <button
                        class="rounded-2xl bg-primary px-6 py-2 font-bold text-zinc-300 dark:bg-white dark:text-primary"
                        @click="$emit('cancel')"
                    >
                        No
                    </button>

                    <button
                        class="rounded-2xl bg-primary px-6 py-2 font-bold text-zinc-300 dark:bg-white dark:text-primary"
                        @click="$emit('delete')"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </ModalTemplate>
</template>
<script lang="ts">
    import ModalTemplate from '../others/ModalTemplate.vue';
    export default {
        components: { ModalTemplate },
        props: {
            entityToDelete: String,
        },
    };
</script>
