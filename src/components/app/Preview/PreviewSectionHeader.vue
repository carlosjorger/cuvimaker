<template>
	<h2 class="text-left text-lg font-extrabold">
		{{ name }}
	</h2>
	<hr class="mt-0.5 h-1 rounded-md bg-base-content" />
</template>

<script setup>
	defineProps({
		name: {
			type: String,
		},
	});
</script>
