<template>
    <SubsectionCard >
        <template #body>
            <SubsectionForm
                    class="text-lg"
                    v-model="introduction.name"
                    placeholder="Name"
                    :lightColor="'primary'"
                    :darkColor="'zinc-300'"
                />
            <SubsectionForm
                        class="text-lg"
                        v-model="introduction.profetion"
                        placeholder="Profetion"
                        :lightColor="'primary'"
                        :darkColor="'zinc-300'"
                    />
        </template>
        <template #footer>
            <Transition>
                <div
                    v-if="editing"
                    class="absolute flex items-center"
                >
                    <a
                        class="w-16 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
                        @click="() => {
                            editing = false;
                        }"  
                    >
                        <Icon
                            icon="el:ok"
                            width="36"
                        />
                    </a>
                </div>
            </Transition>
            <Transition>
                <div
                    v-if="!editing"
                    class="absolute flex items-center"
                >
                    <a
                        class="w-16 p-2 text-white transition-colors duration-500 hover:text-anchor dark:text-dark-primary dark:hover:text-anchor"
                        @click="() => {
                            editing = true;
                        }" 
                    >
                        <Icon
                            icon="ic:baseline-edit"
                            width="36"
                        />
                    </a>
                </div>
            </Transition>
        </template>
    </SubsectionCard>
</template>

<script lang="ts">
    
    import { Introduction } from '../../../../models/Introduction';
    import BasicButton from '../../../shared/Button/BasicButton.vue';
    import SubsectionForm from '../../Subsection/SubsectionForm.vue';
    import { computed } from 'vue';
    import SubsectionCard from '../../../shared/Subsection/SubsectionCard.vue';
    import { Icon } from '@iconify/vue';
    export default {
        components: { BasicButton,SubsectionForm, SubsectionCard, Icon },
        name: 'IntroductionSection',
        props: {
            introduction: {
                type: Introduction,
                required: true,
            },
        },
        data() {
            return {
                ...this.initialState(),
                editing: false,
            };
        },
        provide() {
            return {
                editing: computed(() => this.editing),
            };
        },
        methods: {
            initialState(): {
                currentIntroduction: Introduction;
            } {
                return {
                    currentIntroduction: this.introduction?.copy()??new Introduction(),
                };
            },
        },
    };
</script>
