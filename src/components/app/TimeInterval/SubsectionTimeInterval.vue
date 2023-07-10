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
		<ErrorsSection :errors="v$.value.dateFrom.$errors" />
		<ErrorsSection :errors="v$.value.dateTo.$errors" />
	</div>
</template>

<script lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker';
	import '@vuepic/vue-datepicker/dist/main.css';
	import { TimeInterval } from '../../../models/SubsectionTimeInterval';
	import { helpers, required } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { inject } from 'vue';
	import ErrorsSection from '../../shared/Error/ErrorsSection.vue';

	export default {
		name: 'SubsectionTimeInterval',

		components: { VueDatePicker, ErrorsSection },
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
			this.setTimeInteval(this.value);
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
			setTimeInteval(value: TimeInterval | undefined) {
				if (value && value.dateFrom && value.dateTo) {
					this.interval = [value.dateFrom, value.dateTo];
				}
			},
		},
		watch: {
			modelValue(value: TimeInterval) {
				this.setTimeInteval(value);
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
