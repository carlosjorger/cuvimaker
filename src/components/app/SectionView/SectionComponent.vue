<template>
    <article
        class="mt-4 rounded-md border-4 border-solid border-[var(--primary-color)] bg-[#f6f4fb] shadow-xl dark:border-zinc-300 dark:bg-[#190f35]"
        @click="changeSetting"
    >
        <div class="p-4">
            <header>
                <h3
                    class="text-3xl font-extrabold text-[var(--primary-color)] dark:text-white"
                >
                    {{ section?.name }}
                </h3>
            </header>
            <hr
                class="mt-1 h-1 rounded-md bg-[var(--primary-color)] dark:bg-zinc-300"
            />
            <SubsectionComponent
                v-for="(subsection, index) in section?.subsections"
                :key="index"
                :subsection="subsection"
            />
        </div>
        <div
            class="w-full overflow-hidden bg-[var(--primary-color)] transition-all duration-500"
            :class="{
                ['h-10']: showSetting,
                ['h-0']: !showSetting,
            }"
        >
            <div class="flex w-20 justify-between p-2">
                <Icon icon="mdi:trash" width="22" color="#f5f0ff" />
                <Icon icon="material-symbols:edit" width="22" color="#f5f0ff" />
            </div>
        </div>
    </article>
</template>
<script lang="ts">
    import { Section } from '../../../models/Section';
    import SubsectionComponent from './SubsectionView/SubsectionComponent.vue';
    import { Icon } from '@iconify/vue';

    export default {
        name: 'SectionComponent',
        components: { SubsectionComponent, Icon },
        props: {
            section: {
                type: Section,
                require: true,
            },
        },
        data() {
            return {
                showSetting: false,
            };
        },
        methods: {
            changeSetting() {
                this.showSetting = !this.showSetting;
            },
        },
    };
</script>
