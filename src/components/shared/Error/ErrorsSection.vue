<template>
    <div
        class="p-1 text-base text-red-600 dark:text-rose-500"
        v-for="error of errors"
        :key="error.$uid"
    >
        <div class="flex">
            <span>
                <Icon icon="material-symbols:error-outline" width="23" />
            </span>
            &nbsp;
            <div>{{ error.$message }}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import type { ErrorObject } from '@vuelidate/core';
    import { Icon } from '@iconify/vue';
    export default {
        name: 'ErrorsSection',
        props: {
            errors: Object as () => ErrorObject[],
        },
        components: { Icon },
    };
</script>
