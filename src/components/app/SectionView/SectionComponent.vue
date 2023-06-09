<template>
    <SubsectionCard>
        <template #body>
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
        </template>
        <template #footer>
            <div class="flex w-36 justify-between p-2">
                <a
                    class="w-16 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
                >
                    <Icon
                        @click="$emit('delete-section')"
                        icon="mdi:trash"
                        width="36"
                    />
                </a>
                <a
                    class="w-16 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
                >
                    <Icon
                        icon="material-symbols:edit"
                        width="36"
                        @click="$emit('edit-section')"
                    />
                </a>
            </div>
        </template>
    </SubsectionCard>
</template>
<script lang="ts">
    import { Section } from '../../../models/Section';
    import SubsectionComponent from './Subsection/SubsectionComponent.vue';
    import { Icon } from '@iconify/vue';
    import SubsectionCard from '../../shared/Subsection/SubsectionCard.vue';

    export default {
        name: 'SectionComponent',
        components: { SubsectionComponent, Icon, SubsectionCard },
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
