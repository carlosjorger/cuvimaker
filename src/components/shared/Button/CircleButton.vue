<template>
	<button
		:aria-label="ariaLabel"
		type="button"
		class="btn btn-circle btn-primary btn-outline relative border-2 transition-all duration-200 ease-in"
	>
		<slot></slot>
	</button>
</template>
<script setup lang="ts">
	defineProps({
		ariaLabel: {
			type: String,
		},
	});
</script>
