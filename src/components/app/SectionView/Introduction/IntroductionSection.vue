<template>
    <SubsectionCard
        :disableEditSetting="isBeingEditingIntroduction"
        :ifEditing="isBeingEditingIntroduction"
    >
        <template #body>
            <form v-on:submit.prevent class="font-extrabold">
                <SubsectionForm
                    class="text-3xl"
                    v-model="currentIntroduction.name"
                    placeholder="Your name"
                    :lightColor="'primary'"
                    :darkColor="'zinc-300'"
                    :errors="v$.currentIntroduction.name.$errors"
                />
                <SubsectionForm
                    class="text-2xl"
                    v-model="currentIntroduction.profetion"
                    placeholder="Profetion"
                    :lightColor="'primary'"
                    :darkColor="'zinc-300'"
                    :errors="v$.currentIntroduction.profetion.$errors"
                />
                <div class="flex items-end">
                    <div
                        v-if="
                            currentIntroduction.location ||
                            isBeingEditingIntroduction
                        "
                        class="p-1 text-primary transition-colors duration-500 dark:text-white"
                    >
                        <Icon icon="mdi:location" width="20" />
                    </div>

                    <SubsectionForm
                        class="text-lg"
                        v-model="currentIntroduction.location"
                        placeholder="Location"
                        :lightColor="'primary'"
                        :darkColor="'zinc-300'"
                        :errors="v$.currentIntroduction.profetion.$errors"
                    />
                </div>
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
    import { useVuelidate } from '@vuelidate/core';
    import { required } from '@vuelidate/validators';

    export default {
        components: { SubsectionForm, SubsectionCard, Icon },
        setup() {
            return {
                v$: useVuelidate({ $scope: true }),
            };
        },
        name: 'IntroductionSection',
        props: {
            introduction: {
                type: Introduction,
                required: true,
            },
            isBeingEditingIntroduction: Boolean,
        },
        data(): {
            currentIntroduction: Introduction;
        } {
            return this.initialState();
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
                    currentIntroduction: this.introduction.copy(),
                };
            },
            setEditingIntroduction(value: boolean) {
                if (this.isBeingEditingIntroduction) {
                    this.v$.$validate();
                    if (this.v$.$error) {
                        return;
                    } else {
                        this.v$.$reset();
                    }
                }
                this.$emit('set-editing-introduction', value);
            },
        },
        validations: {
            currentIntroduction: {
                name: {
                    required,
                },
                profetion: {
                    required,
                },
            },
        },
    };
</script>
