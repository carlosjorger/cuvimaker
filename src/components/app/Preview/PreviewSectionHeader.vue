<template>
	<h2 class="text-lg font-extrabold text-primary dark:text-white">
		{{ name }}
	</h2>
	<hr class="mt-1 h-1 rounded-md bg-primary dark:bg-zinc-300" />
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
			},
		},
	};
</script>
