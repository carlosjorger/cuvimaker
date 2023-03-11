<template>
    <article
        class="mt-4 w-5/12 rounded-md border-4 border-solid border-[var(--primary-color)] bg-[#f6f4fb] shadow-xl dark:border-zinc-300 dark:bg-[#190f35]"
    >
        <div class="p-4" @click="changeSetting">
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
            class="w-full overflow-hidden bg-[var(--primary-color)] transition-all duration-500 dark:bg-zinc-300"
            :class="{
                ['h-10']: showSetting,
                ['h-0']: !showSetting,
            }"
        >
            <footer class="flex justify-end">
                <div class="flex w-20 justify-between p-2">
                    <a
                        class="w-16 text-white transition-colors duration-500 hover:text-[var(--anchor-color)] dark:text-[#190f35] dark:hover:text-[var(--anchor-color)]"
                    >
                        <Icon
                            @click="$emit('delete-section')"
                            icon="mdi:trash"
                            width="22"
                        />
                    </a>
                    <a
                        class="w-16 text-white transition-colors duration-500 hover:text-[var(--anchor-color)] dark:text-[#190f35] dark:hover:text-[var(--anchor-color)]"
                    >
                        <Icon icon="material-symbols:edit" width="22" />
                    </a>
                </div>
            </footer>
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
