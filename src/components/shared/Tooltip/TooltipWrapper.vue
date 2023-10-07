<template>
	<div
		class="tooltip tooltip-bottom relative inline-block text-xs"
		:data-tip="text"
	>
		<slot />
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
