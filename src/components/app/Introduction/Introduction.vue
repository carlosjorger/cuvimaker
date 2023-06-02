<template>
    <input type="text" v-model="introduction?.name" :disabled="editing" />
    <input type="text" v-model="introduction?.profetion" :disabled="editing" />
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
                introduction?.setIntroduction(currentIntroduction);
            }
        "
    />
</template>

<script lang="ts">
    import { Introduction } from '../../../models/Introduction';
    import BasicButton from '../../shared/Button/BasicButton.vue';

    export default {
        components: { BasicButton },
        name: 'Introduction',
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
        methods: {
            initialState(): {
                currentIntroduction: Introduction;
            } {
                return {
                    currentIntroduction: this.introduction.ifEmpty()
                        ? new Introduction()
                        : this.introduction.copy(),
                };
            },
        },
    };
</script>
