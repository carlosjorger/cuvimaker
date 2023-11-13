<template>
	<div class="flex items-center gap-1">
		<input
			type="checkbox"
			class="toggle toggle-primary toggle-lg"
			v-model="value"
		/>
		<h4>{{ title }}</h4>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const emit = defineEmits(['update:modelValue']);

	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
		modelValue: {
			type: Boolean,
		},
	});
	const value = computed({
		get() {
			return props.modelValue;
		},
		set(value: boolean) {
			emit('update:modelValue', value);
		},
	});
</script>
