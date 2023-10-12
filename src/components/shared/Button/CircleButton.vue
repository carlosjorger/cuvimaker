<template>
	<button
		:aria-label="ariaLabel"
		type="button"
		class="btn btn-circle btn-primary btn-outline btn-xs relative border-2 transition-all duration-200 ease-in"
		:class="[buttonSizeClass]"
	>
		<slot></slot>
	</button>
</template>
<script setup lang="ts">
	import { computed } from 'vue';

	const props = defineProps({
		ariaLabel: {
			type: String,
		},
		buttonSize: {
			type: String,
			default: 'md',
		},
	});
	const buttonSizeClass = computed(() => {
		if (props.buttonSize == 'xs') {
			return 'btn-xs';
		}
		if (props.buttonSize == 'sm') {
			return 'btn-sm';
		}
		if (props.buttonSize == 'lg') {
			return 'btn-lg';
		}
		return 'btn-md';
	});
</script>
