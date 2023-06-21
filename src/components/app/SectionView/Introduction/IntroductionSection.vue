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
                        class="min-w-[80%] text-lg"
                        v-model="currentIntroduction.location"
                        placeholder="Location"
                        :lightColor="'primary'"
                        :darkColor="'zinc-300'"
                    />
                </div>
                <div class="flex items-end" v-if="isBeingEditingIntroduction">
                    <div
                        class="p-1 text-primary transition-colors duration-500 dark:text-white"
                    >
                        <Icon icon="mdi:account" width="20" />
                    </div>
                    <!--TODO: Align input with the addButton if there are errors-->
                    <SubsectionForm
                        class="min-w-[80%] text-lg"
                        v-model="currentSocialAccount"
                        placeholder="Add a Social Account"
                        :lightColor="'primary'"
                        :darkColor="'zinc-300'"
                        :errors="v$.currentSocialAccount.$errors"
                    />
                    <AppearFadeTransition>
                        <CloseAddButton
                            v-if="currentSocialAccount.trim()"
                            :size="2.3"
                            v-on:click="addSocialAccount()"
                            :buttonColor="'bg-inherit'"
                            :lineColor="'white'"
                        />
                    </AppearFadeTransition>
                </div>
                <ul>
                    <li
                        v-for="(
                            socialAccount, index
                        ) in currentIntroduction.socialAccounts"
                        :key="index"
                    >
                        <div class="flex items-end">
                            <div
                                class="p-1 text-primary transition-colors duration-500 dark:text-white"
                            >
                                <!-- TODO: show icon according to the social media -->
                                <Icon
                                    icon="material-symbols:account-box"
                                    width="20"
                                />
                            </div>
                            <!-- TODO: Add styles to links -->
                            <a :href="socialAccount">{{ socialAccount }}</a>
                        </div>
                    </li>
                </ul>
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
    import { required, url } from '@vuelidate/validators';
    import CloseAddButton from '../../../shared/Button/CloseAddButton.vue';
    import AppearFadeTransition from '../../../shared/Transition/AppearFadeTransition.vue';
    export default {
        components: {
            SubsectionForm,
            SubsectionCard,
            Icon,
            CloseAddButton,
            AppearFadeTransition,
        },
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
            currentSocialAccount: string;
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
                currentSocialAccount: string;
            } {
                return {
                    currentIntroduction: this.introduction.copy(),
                    currentSocialAccount: '',
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
            addSocialAccount() {
                this.v$.$validate();
                if (this.v$.$error) {
                    console.log('error');
                    return;
                }
                this.currentIntroduction.socialAccounts.push(
                    this.currentSocialAccount
                );
                this.currentSocialAccount = '';
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
            currentSocialAccount: { url },
        },
    };
</script>
