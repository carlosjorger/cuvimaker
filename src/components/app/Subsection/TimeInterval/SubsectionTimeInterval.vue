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
        <div v-for="error of v$.value.dateFrom.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
        <div v-for="error of v$.value.dateTo.$errors" :key="error.$uid">
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
            modelValue: TimeInterval,
            hasPeriodOfTime: {
                type: Boolean,
                required: true,
            },
        },
        emits: ['update:modelValue'],
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
            if (this.value && this.value.dateFrom && this.value.dateTo) {
                this.interval = [this.value.dateFrom, this.value.dateTo];
            }
        },
        methods: {
            handleTimeInterval(dateRange: Date[] | null) {
                if (dateRange && dateRange.length > 1) {
                    this.value = new TimeInterval(dateRange[0], dateRange[1]);
                }
            },
            cleanTimeInterval() {
                this.value = new TimeInterval();
            },
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
        validations: {
            value: {
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
