<template>
    <div class="mt-2">
        <SwitchCheckbox
            v-if="editing"
            v-model="hasPeriodOfTime"
            :title="'Add a time interval'"
        />
        <SubsectionTimeInterval
            v-if="
                (editing || (timeInterval.dateFrom && timeInterval.dateTo)) &&
                hasPeriodOfTime
            "
            :timeInterval="timeInterval"
            :hasPeriodOfTime="hasPeriodOfTime"
        />
    </div>
</template>

<script lang="ts">
    import { TimeInterval } from '../../../../models/SubsectionTimeInterval';
    import SwitchCheckbox from '../../../shared/checkbox/SwitchCheckbox.vue';
    import { inject } from 'vue';
    import { Subsection } from '../../../../models/Subsection';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    import SubsectionTimeInterval from './SubsectionTimeInterval.vue';
    export default {
        name: 'SubsectionTimeIntervalSection',
        props: {
            subsectionTimeIntervalProp: {
                type: TimeInterval,
            },
            validating: {
                type: Boolean,
            },
        },
        components: { SwitchCheckbox, VueDatePicker, SubsectionTimeInterval },

        data() {
            return {
                editing: inject('editing', false),
                subsection: inject('subsection', new Subsection()),
                hasPeriodOfTime: false,

                timeInterval: new TimeInterval(),
            };
        },

        mounted() {
            this.timeInterval =
                this.subsectionTimeIntervalProp?.copy() ?? new TimeInterval();
        },

        watch: {
            hasPeriodOfTime(newValue: boolean) {
                this.subsection.subsectionTimeInterval = newValue
                    ? this.timeInterval
                    : undefined;
            },
        },
    };
</script>
