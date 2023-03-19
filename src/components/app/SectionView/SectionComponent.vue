<template>
    <article
        class="mt-4 w-5/12 rounded-md border-4 border-solid border-primary bg-[#f6f4fb] shadow-xl transition-colors duration-700 hover:bg-[#e1d7fd] dark:border-zinc-300 dark:bg-dark-primary-300 dark:hover:bg-dark-primary"
    >
        <div class="p-4" @click="changeSetting">
            <header>
                <h3
                    class="text-3xl font-extrabold text-primary dark:text-white"
                >
                    {{ section?.name }}
                </h3>
            </header>
            <hr class="mt-1 h-1 rounded-md bg-primary dark:bg-zinc-300" />

            <SubsectionComponent
                v-for="(subsection, index) in section?.subsections"
                :key="index"
                :subsection="subsection"
            />
        </div>
        <div
            class="w-full overflow-hidden bg-primary transition-all duration-500 dark:bg-zinc-300"
            :class="{
                ['h-10']: showSetting,
                ['h-0']: !showSetting,
            }"
        >
            <footer class="flex justify-end">
                <div class="flex w-20 justify-between p-2">
                    <a
                        class="w-16 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
                    >
                        <Icon
                            @click="$emit('delete-section')"
                            icon="mdi:trash"
                            width="22"
                        />
                    </a>
                    <a
                        class="w-16 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
                    >
                        <Icon
                            icon="material-symbols:edit"
                            width="22"
                            @click="$emit('edit-section')"
                        />
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
