<template>
	<div class="m-1">
		<SwitchCheckbox
			v-if="editing"
			v-model="hasPeriodOfTime"
			:title="'Add a site'"
		/>
		<div class="flex items-center justify-between">
			<SubsectionTimeInterval
				v-if="hasPeriodOfTime"
				v-model="value"
				:hasPeriodOfTime="hasPeriodOfTime"
			/>
			<BasicTextArea
				v-if="hasPeriodOfTime"
				class="mt-1"
				v-model="subsection.location"
				placeholder="* Location"
			/>
		</div>
	</div>
</template>

<script lang="ts">
	import SwitchCheckbox from '../../../shared/checkbox/SwitchCheckbox.vue';
	import { inject } from 'vue';
	import { Subsection } from '../../../../models/Subsection';
	import SubsectionTimeInterval from './EditorTimeInterval.vue';
	import { TimeInterval } from '../../../../models/SubsectionTimeInterval';
	import BasicTextArea from '../../../shared/TextArea/BasicTextArea.vue';

	export default {
		name: 'SubsectionTimeIntervalSection',
		props: {
			modelValue: TimeInterval,
			location: String,
			validating: {
				type: Boolean,
			},
		},
		emits: ['update:modelValue', 'update:location'],
		components: { SwitchCheckbox, SubsectionTimeInterval, BasicTextArea },
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
			locationValue: {
				get() {
					return this.location;
				},
				set(value: string) {
					this.$emit('update:location', value);
				},
			},

			hasSettedPeriodOfTime: function () {
				return Boolean(this.modelValue && this.modelValue?.dateFrom);
			},
		},
		watch: {
			hasSettedPeriodOfTime(value: boolean) {
				this.hasPeriodOfTime = value;
			},
		},
	};
</script>
