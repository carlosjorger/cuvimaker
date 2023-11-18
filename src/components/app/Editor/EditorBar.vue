<template>
	<div
		role="tablist"
		class="tabs-lifted tabs-lg tabs -mb-px justify-self-start"
	>
		<button
			role="tab"
			class="tab tab-lg [--tab-border-color:transparent]"
			:class="{ 'tab-active': isEditingResume }"
			@click="isEditingResume = true"
			aria-label="Edit resume"
		>
			Edit
		</button>
		<button
			role="tab"
			class="tab tab-lg [--tab-border-color:transparent]"
			:class="{ 'tab-active': !isEditingResume }"
			@click="isEditingResume = false"
			aria-label="View preview of resume"
		>
			Preview
		</button>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const emit = defineEmits(['update:modelValue']);

	const props = defineProps({
		modelValue: {
			type: Boolean,
			required: true,
		},
	});
	const isEditingResume = computed({
		get() {
			return props.modelValue;
		},
		set(value: boolean) {
			emit('update:modelValue', value);
		},
	});
</script>
