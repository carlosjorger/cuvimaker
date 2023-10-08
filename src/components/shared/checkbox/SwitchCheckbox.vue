<template>
	<input type="checkbox" class="toggle toggle-primary" v-model="value" />
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
