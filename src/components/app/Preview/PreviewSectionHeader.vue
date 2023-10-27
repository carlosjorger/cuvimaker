<template>
	<h2 class="text-lg font-extrabold">
		{{ name }}
	</h2>
	<hr class="mt-1 h-1 rounded-md" />
</template>

<script setup>
	defineProps({
		name: {
			type: String,
		},
	});
</script>
