<template>
    <SubsectionCard class="p-8">
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
        <BasicButton
            :name="'Edit'"
            @click="
                () => {
                    editing = true;
                }
            "
        />
        <BasicButton
            :name="'Save'"
            @click="
                () => {
                    editing = false;
                    // introduction?.setIntroduction(currentIntroduction);
                }
            "
        />
    </SubsectionCard>
</template>

<script lang="ts">
    
    import { Introduction } from '../../../../models/Introduction';
    import BasicButton from '../../../shared/Button/BasicButton.vue';
    import SubsectionForm from '../../Subsection/SubsectionForm.vue';
    import { computed } from 'vue';
    import SubsectionCard from '../../../shared/Subsection/SubsectionCard.vue';
    export default {
        components: { BasicButton,SubsectionForm, SubsectionCard },
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
