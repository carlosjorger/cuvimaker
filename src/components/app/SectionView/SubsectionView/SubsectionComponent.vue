<template>
    <h4 class="mt-2 font-semibold">{{ subsection?.title }}</h4>
    <h5 class="mt-2 font-extrabold">{{ subsection?.text }}</h5>
</template>

<script lang="ts">
    import { Subsection } from '../../../../models/Subsection';

    export default {
        name: 'SubsectionComponent',
        props: {
            subsection: {
                type: Subsection,
                require: true,
            },
        },
    };
</script>
