<template>
	<div class="mt-2 px-2">
		<SwitchCheckbox
			v-if="editing"
			v-model="hasPeriodOfTime"
			:title="'Add a time interval'"
		/>
		<!-- TODO: Add location -->
		<SubsectionTimeInterval
			v-if="hasPeriodOfTime"
			v-model="value"
			:hasPeriodOfTime="hasPeriodOfTime"
		/>
	</div>
</template>

<script lang="ts">
	import SwitchCheckbox from '../../../shared/checkbox/SwitchCheckbox.vue';
	import { inject } from 'vue';
	import { Subsection } from '../../../../models/Subsection';
	import SubsectionTimeInterval from './EditorTimeInterval.vue';
	import { TimeInterval } from '../../../../models/SubsectionTimeInterval';
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
		mounted() {
			this.hasPeriodOfTime = this.hasSettedPeriodOfTime;
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
			hasSettedPeriodOfTime: function () {
				return Boolean(
					this.modelValue &&
						this.modelValue?.dateFrom &&
						this.modelValue?.dateTo
				);
			},
		},
		watch: {
			hasSettedPeriodOfTime(value: boolean) {
				this.hasPeriodOfTime = value;
			},
		},
	};
</script>
