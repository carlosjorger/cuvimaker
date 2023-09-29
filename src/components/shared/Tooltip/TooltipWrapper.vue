<template>
	<div class="tooltip-wrapper relative inline-block text-sm">
		<slot />
		<span
			class="tooltip--bottom tooltip__text invisible absolute -bottom-[100%] rounded-lg bg-dark-primary p-1 text-center text-white opacity-0 transition-all duration-500 dark:bg-dark-primary-200"
			:class="{
				[`-inset-x-[240%]`]: text.length > 20,
				[`-inset-x-[220%]`]: text.length > 17,
				[`-inset-x-[120%]`]: text.length > 10,
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
