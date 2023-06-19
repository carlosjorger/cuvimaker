<template>
    <SubsectionCard
        :disableEditSetting="isBeingEditingIntroduction"
        :ifEditing="isBeingEditingIntroduction"
    >
        <template #body>
            <form v-on:submit.prevent class="font-extrabold">
                <!-- TODO: Add require validation to Name -->
                <SubsectionForm
                    class="text-3xl"
                    v-model="currentIntroduction.name"
                    placeholder="Your name"
                    :lightColor="'primary'"
                    :darkColor="'zinc-300'"
                />
                <!-- TODO: Add require validation to Name -->
                <SubsectionForm
                    class="text-xl"
                    v-model="currentIntroduction.profetion"
                    placeholder="Profetion"
                    :lightColor="'primary'"
                    :darkColor="'zinc-300'"
                />
            </form>
        </template>
        <template #footer>
            <Transition>
                <div
                    v-if="isBeingEditingIntroduction"
                    class="absolute flex h-full items-center"
                >
                    <a
                        class="w-16 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
                        @click="
                            () => {
                                setEditingIntroduction(false);
                            }
                        "
                    >
                        <Icon icon="el:ok" width="36" />
                    </a>
                </div>
            </Transition>
            <Transition>
                <div
                    v-if="!isBeingEditingIntroduction"
                    class="absolute flex h-full items-center"
                >
                    <a
                        class="w-16 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
                        @click="
                            () => {
                                setEditingIntroduction(true);
                            }
                        "
                    >
                        <Icon icon="ic:baseline-edit" width="36" />
                    </a>
                </div>
            </Transition>
        </template>
    </SubsectionCard>
</template>

<script lang="ts">
    import { Introduction } from '../../../../models/Introduction';
    import SubsectionForm from '../../Subsection/SubsectionForm.vue';
    import { computed } from 'vue';
    import SubsectionCard from '../../../shared/Subsection/SubsectionCard.vue';
    import { Icon } from '@iconify/vue';
    export default {
        components: { SubsectionForm, SubsectionCard, Icon },
        name: 'IntroductionSection',
        props: {
            introduction: {
                type: Introduction,
                required: true,
            },
            isBeingEditingIntroduction: Boolean,
        },
        data() {
            return {
                ...this.initialState(),
            };
        },
        provide() {
            return {
                editing: computed(() => this.isBeingEditingIntroduction),
            };
        },
        methods: {
            initialState(): {
                currentIntroduction: Introduction;
            } {
                return {
                    currentIntroduction: { ...this.introduction },
                };
            },
            setEditingIntroduction(value: boolean) {
                this.$emit('set-editing-introduction', value);
            },
        },
    };
</script>
