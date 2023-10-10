<template>
	<div class="mt-2">
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
			:dark="isDarkMode()"
			:format="format"
		/>
		<ErrorsSection :errors="v$.value.dateFrom.$errors" />
	</div>
</template>

<script lang="ts">
	import VueDatePicker from '@vuepic/vue-datepicker';
	import '@vuepic/vue-datepicker/dist/main.css';
	import { TimeInterval } from '../../../../models/SubsectionTimeInterval';
	import { helpers, required } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { inject } from 'vue';
	import ErrorsSection from '../../../shared/Error/ErrorsSection.vue';
	import { isDarkMode } from '../../../../utils/theme';
	export default {
		name: 'EditorTimeInterval',

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
			isDarkMode() {
				return isDarkMode();
			},
			handleTimeInterval(dateRange: Date[] | null) {
				if (dateRange && dateRange.length > 1) {
					this.value = new TimeInterval(dateRange[0], dateRange[1]);
				}
			},
			cleanTimeInterval() {
				this.value = new TimeInterval();
			},
			setTimeInteval(value: TimeInterval | undefined) {
				if (!value || !value.dateFrom) {
					return;
				}
				this.interval = [value.dateFrom];
				if (value.dateTo) {
					this.interval.push(value.dateTo);
				}
			},
			format(dates: Date[]) {
				const [dateFrom, dateTo] = dates;
				let result = '';
				if (dateFrom) {
					result += this.formatDate(dateFrom);
				}
				if (dateTo) {
					result += ` - ${this.formatDate(dateTo)}`;
				}
				return result;
			},
			formatDate(date: Date) {
				const day = date.getDate();
				const month = date.getMonth() + 1;
				const year = date.getFullYear();

				return `${day}/${month}/${year}`;
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
			},
		},
	};
</script>
<!-- TODO: Change colors-->
<style>
	.dp__theme_dark {
		--zinc-color: rgb(212 212 216);
		--zinc-color-2: rgba(161 161 170);
		--zinc-color-3: #71717a;
		--dark-primary-color: #3f3268;

		--dp-background-color: #120a25;
		--dp-text-color: var(--zinc-color);
		--dp-hover-color: var(--dark-primary-color);
		--dp-hover-text-color: var(--zinc-color);
		--dp-hover-icon-color: var(--zinc-color-3);
		--dp-primary-color: var(--dark-primary-color);
		--dp-primary-text-color: var(--zinc-color);
		--dp-secondary-color: var(--zinc-color-2);
		--dp-border-color: var(--zinc-color-3);
		--dp-menu-border-color: var(--zinc-color-3);
		--dp-border-color-hover: #aaaeb7;
		--dp-disabled-color: var(--zinc-color-3);
		--dp-scroll-bar-background: #120a25;
		--dp-scroll-bar-color: #3f3268;
		--dp-success-color: #00701a;
		--dp-success-color-disabled: #428f59;
		--dp-icon-color: var(--zinc-color-2);
		--dp-danger-color: #e53935;
		--dp-highlight-color: rgba(0, 92, 178, 0.2);
	}
	.dp__theme_light {
		--primary-color: #3c1774;

		--dp-background-color: #ffffff;
		--dp-text-color: var(--primary-color);
		--dp-hover-color: #f3f3f3;
		--dp-hover-text-color: var(--primary-color);
		--dp-hover-icon-color: var(--primary-color);
		--dp-primary-color: var(--primary-color);
		--dp-primary-text-color: #f8f5f5;
		--dp-secondary-color: #c0c4cc;
		--dp-border-color: var(--primary-color);
		--dp-menu-border-color: var(--primary-color);
		--dp-border-color-hover: #aaaeb7;
		--dp-disabled-color: #f6f6f6;
		--dp-scroll-bar-background: #f3f3f3;
		--dp-scroll-bar-color: var(--primary-color);
		--dp-success-color: #76d275;
		--dp-success-color-disabled: #a3d9b1;
		--dp-icon-color: var(--primary-color);
		--dp-danger-color: #ff6f60;
		--dp-highlight-color: rgba(25, 118, 210, 0.1);
	}
</style>
