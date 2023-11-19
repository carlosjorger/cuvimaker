<template>
	<!-- TODO: add collapse -->
	<div class="mt-4">
		<SwitchCheckbox
			v-if="editing"
			v-model="hasPeriodOfTime"
			:title="'Add a site'"
		/>
		<div
			class="grid grid-cols-2 items-center gap-8 max-sm:grid-cols-1 max-sm:gap-0"
		>
			<SubsectionTimeInterval
				v-if="hasPeriodOfTime"
				v-model="value"
				:hasPeriodOfTime="hasPeriodOfTime"
			/>
			<div class="mt-2">
				<BasicTextArea
					v-if="hasPeriodOfTime"
					class="mt-1"
					v-model="subsection.location"
					placeholder="* Location"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import SwitchCheckbox from '../../../shared/checkbox/SwitchCheckbox.vue';
	import { computed, inject, onMounted, ref, watch } from 'vue';
	import { Subsection } from '../../../../models/Subsection';
	import SubsectionTimeInterval from './EditorTimeInterval.vue';
	import { TimeInterval } from '../../../../models/SubsectionTimeInterval';
	import BasicTextArea from '../../../shared/TextArea/BasicTextArea.vue';
	const props = defineProps({
		modelValue: TimeInterval,
		location: String,
		validating: {
			type: Boolean,
		},
	});
	const emit = defineEmits(['update:modelValue', 'update:location']);
	const editing = inject('editing', false);
	const subsection = inject('subsection', new Subsection());
	const hasPeriodOfTime = ref(false);
	onMounted(() => {
		hasPeriodOfTime.value = hasSettedPeriodOfTime.value;
	});
	const value = computed({
		get() {
			return props.modelValue ?? new TimeInterval();
		},
		set(value: TimeInterval) {
			emit('update:modelValue', value);
		},
	});
	const hasSettedPeriodOfTime = computed(() =>
		Boolean(props.modelValue && props.modelValue?.dateFrom)
	);
	watch(
		() => hasSettedPeriodOfTime.value,
		(value: boolean) => {
			hasPeriodOfTime.value = value;
		}
	);
</script>
