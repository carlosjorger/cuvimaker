<template>
    <article
        class="mt-4 rounded-md border-4 border-solid border-[var(--primary-color)] bg-[#f6f4fb] p-4 dark:border-zinc-300 dark:bg-[#190f35]"
    >
        <header>
            <h3
                class="text-3xl font-extrabold text-[var(--primary-color)] dark:text-white"
            >
                {{ section?.name }}
            </h3>
            <hr
                class="mt-1 h-1 rounded-md bg-[var(--primary-color)] dark:bg-zinc-300"
            />
            <SubsectionComponent
                v-for="(subsection, index) in section?.subsections"
                :key="index"
                :subsection="subsection"
            />
        </header>
    </article>
</template>
<script lang="ts">
    import { Section } from '../../../models/Section';
    import SubsectionComponent from './SubsectionView/SubsectionComponent.vue';
    export default {
        name: 'SectionComponent',
        components: { SubsectionComponent },
        props: {
            section: {
                type: Section,
                require: true,
            },
        },
    };
</script>
