<template>
    <div class="mt-2 w-11/12">
        <VueDatePicker
            :range="true"
            v-model="interval"
            :min-date="from"
            :max-date="to"
            :disabled="!editing"
            v-on:update:model-value="handleTimeInterval"
            teleport-center
            required
            @cleared="cleanTimeInterval"
            input-class-name="shadow-xl"
        />
        <div
            v-for="error of v$.timeInterval.dateFrom.$errors"
            :key="error.$uid"
        >
            <div class="error-msg">{{ error.$message }}</div>
        </div>
        <div v-for="error of v$.timeInterval.dateTo.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';
    import { TimeInterval } from '../../../../models/SubsectionTimeInterval';
    import { helpers, required } from '@vuelidate/validators';
    import { useVuelidate } from '@vuelidate/core';
    import { inject } from 'vue';
    export default {
        name: 'SubsectionTimeInterval',

        components: { VueDatePicker },
        props: {
            timeInterval: {
                type: TimeInterval,
                required: true,
            },
            hasPeriodOfTime: {
                type: Boolean,
                required: true,
            },
        },
        setup() {
            return { v$: useVuelidate({ $scope: true }) };
        },
        data() {
            return {
                editing: inject('editing', false),
                from: new Date(1999, 1, 1),
                to: new Date(),
                interval: <Date[]>[],
            };
        },
        mounted() {
            if (
                this.timeInterval.dateFrom != undefined &&
                this.timeInterval.dateTo != undefined
            ) {
                this.interval = [
                    this.timeInterval.dateFrom!,
                    this.timeInterval.dateTo!,
                ];
            }
        },
        methods: {
            handleTimeInterval(dateRange: Date[] | null) {
                if (dateRange?.length ?? 0 > 0) {
                    this.timeInterval.dateFrom = dateRange
                        ? dateRange[0]
                        : undefined;
                    this.timeInterval.dateTo = dateRange
                        ? dateRange[1]
                        : undefined;
                }
            },
            cleanTimeInterval() {
                this.timeInterval.dateFrom = undefined;
                this.timeInterval.dateTo = undefined;
            },
        },
        validations: {
            timeInterval: {
                dateFrom: {
                    required: helpers.withMessage(
                        'Date From is required',
                        required
                    ),
                },
                dateTo: {
                    required: helpers.withMessage(
                        'Date To is required',
                        required
                    ),
                },
            },
        },
    };
</script>

<style scoped></style>
