<template>
    <div class="mt-2">
        <SwitchCheckbox
            v-if="editing"
            v-model="hasPeriodOfTime"
            :title="'Add a time interval'"
        />
        <SubsectionTimeInterval
            v-if="
                (editing || (value && value.dateFrom && value.dateTo)) &&
                hasPeriodOfTime
            "
            v-model="value"
            :hasPeriodOfTime="hasPeriodOfTime"
        />
    </div>
</template>

<script lang="ts">
    import SwitchCheckbox from '../../shared/checkbox/SwitchCheckbox.vue';
    import { inject } from 'vue';
    import { Subsection } from '../../../models/Subsection';
    import '@vuepic/vue-datepicker/dist/main.css';
    import SubsectionTimeInterval from './SubsectionTimeInterval.vue';
    import { TimeInterval } from '../../../models/SubsectionTimeInterval';
    export default {
        name: 'SubsectionTimeIntervalSection',
        props: {
            modelValue: TimeInterval,
            validating: {
                type: Boolean,
            },
        },
        emits: ['update:modelValue'],
        components: { SwitchCheckbox, SubsectionTimeInterval },
        data() {
            return {
                editing: inject('editing', false),
                subsection: inject('subsection', new Subsection()),
                hasPeriodOfTime: false,
            };
        },
        computed: {
            value: {
                get() {
                    return this.modelValue;
                },
                set(value: TimeInterval) {
                    this.$emit('update:modelValue', value);
                },
            },
        },
    };
</script>
