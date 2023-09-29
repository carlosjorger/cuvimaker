<template>
	<div class="tooltip-wrapper relative inline-block text-xs">
		<slot />
		<span
			class="tooltip--bottom tooltip__text invisible absolute -bottom-[100%] z-50 rounded-md bg-dark-primary p-1 text-center text-white opacity-0 transition-all duration-500 dark:bg-dark-primary-200"
			:class="{
				[`-inset-x-[225%]`]: text.length > 20,
				[`-inset-x-[205%]`]: text.length > 17,
				[`-inset-x-[105%]`]: text.length > 10,
			}"
			>{{ text }}</span
		>
	</div>
</template>
<script setup lang="ts">
	defineProps({
		text: {
			type: String,
			required: true,
		},
	});
</script>
<style>
	.tooltip-wrapper:hover .tooltip__text {
		visibility: visible;
		opacity: 1;
	}
</style>
