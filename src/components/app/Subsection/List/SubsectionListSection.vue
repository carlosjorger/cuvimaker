<template>
    <div class="mt-2">
        <SwitchCheckbox
            v-if="editing"
            v-model="hasElementList"
            :title="'Add a List'"
        />
        <subsection-elements v-if="hasElementList" />
    </div>
</template>

<script lang="ts">
    import { inject } from 'vue';
    import SwitchCheckbox from '../../../shared/checkbox/SwitchCheckbox.vue';
    import SubsectionElements from './SubsectionElements.vue';
    export default {
        name: 'SubsectionListSection',
        components: { SwitchCheckbox, SubsectionElements },

        data() {
            return {
                editing: inject('editing', false),
                hasElementList: false,
            };
        },
    };
</script>

<style scoped></style>
